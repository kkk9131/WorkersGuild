import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Database } from '../types/database'
import { ensureUserProfile, retryProfileCreation, validateProfileData } from '../lib/profileUtils'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

interface AuthState {
    session: Session | null
    user: User | null
    profile: UserProfile | null
    loading: boolean
    initialized: boolean
    error: string | null
}

interface AuthActions {
    signUp: (email: string, password: string, userData: { username: string; display_name: string }) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    initialize: () => Promise<void>
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>
    fetchProfile: () => Promise<void>
    clearError: () => void
    resetAuth: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            session: null,
            user: null,
            profile: null,
            loading: false,
            initialized: false,
            error: null,

            initialize: async () => {
                try {
                    set({ loading: true, error: null })

                    // Get initial session
                    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

                    if (sessionError) {
                        console.error('Session error:', sessionError)
                        set({ error: sessionError.message })
                        return
                    }

                    if (session) {
                        set({ session, user: session.user })
                        await get().fetchProfile()
                    }

                    // Listen for auth changes
                    supabase.auth.onAuthStateChange(async (event, session) => {
                        console.log('Auth state changed:', event, session?.user?.email)

                        set({ session, user: session?.user || null })

                        if (session?.user) {
                            await get().fetchProfile()
                        } else {
                            set({ profile: null })
                        }
                    })

                    set({ initialized: true })
                } catch (error: any) {
                    console.error('Auth initialization error:', error)
                    set({ error: error.message })
                } finally {
                    set({ loading: false })
                }
            },

            signUp: async (email: string, password: string, userData: { username: string; display_name: string }) => {
                try {
                    set({ loading: true, error: null })

                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                username: userData.username,
                                display_name: userData.display_name,
                                full_name: userData.display_name,
                            }
                        }
                    })

                    if (error) throw error

                    // Profile creation is now handled by database trigger
                    // But we can still manually create/update if needed
                    if (data.user && data.user.email_confirmed_at) {
                        try {
                            const { error: profileError } = await supabase
                                .from('user_profiles')
                                .upsert({
                                    id: data.user.id,
                                    username: userData.username,
                                    display_name: userData.display_name,
                                }, {
                                    onConflict: 'id'
                                })

                            if (profileError) {
                                console.warn('Profile creation warning:', profileError.message)
                                // Don't throw error - user creation was successful
                            }
                        } catch (profileError: any) {
                            console.warn('Profile creation failed, but user was created:', profileError.message)
                            // Continue - the trigger should have handled profile creation
                        }
                    }
                } catch (error: any) {
                    console.error('Sign up error:', error)
                    set({ error: error.message })
                    throw error
                } finally {
                    set({ loading: false })
                }
            },

            signIn: async (email: string, password: string) => {
                try {
                    set({ loading: true, error: null })

                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    })

                    if (error) throw error

                    // Session will be set by the auth state change listener
                } catch (error: any) {
                    console.error('Sign in error:', error)
                    set({ error: error.message })
                    throw error
                } finally {
                    set({ loading: false })
                }
            },

            signOut: async () => {
                try {
                    set({ loading: true, error: null })
                    const { error } = await supabase.auth.signOut()
                    if (error) throw error

                    set({ session: null, user: null, profile: null })
                } catch (error: any) {
                    console.error('Sign out error:', error)
                    set({ error: error.message })
                    throw error
                } finally {
                    set({ loading: false })
                }
            },

            fetchProfile: async () => {
                try {
                    const { user } = get()
                    if (!user) return

                    // Use the utility function to ensure profile exists
                    const result = await ensureUserProfile(user.id, {
                        email: user.email || undefined,
                        username: user.user_metadata?.username,
                        display_name: user.user_metadata?.display_name || user.user_metadata?.full_name
                    })

                    if (result.success && result.profile) {
                        set({ profile: result.profile })
                    } else if (result.needsManualCreation) {
                        // Try retry mechanism for critical profile creation
                        console.log('Attempting profile creation with retry...')
                        const retryResult = await retryProfileCreation(user.id, {
                            username: user.user_metadata?.username || `user_${user.id.substring(0, 8)}`,
                            display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'New User'
                        })

                        if (retryResult.success && retryResult.profile) {
                            set({ profile: retryResult.profile })
                        } else {
                            console.error('Profile creation failed after retries:', retryResult.error)
                            set({ error: `Profile creation failed: ${retryResult.error}` })
                        }
                    } else {
                        console.error('Profile fetch failed:', result.error)
                        set({ error: result.error })
                    }
                } catch (error: any) {
                    console.error('Fetch profile error:', error)
                    set({ error: error.message })
                }
            },

            updateProfile: async (updates: Partial<UserProfile>) => {
                try {
                    set({ loading: true, error: null })
                    const { user } = get()
                    if (!user) throw new Error('No user logged in')

                    const { data, error } = await supabase
                        .from('user_profiles')
                        .update(updates)
                        .eq('id', user.id)
                        .select()
                        .single()

                    if (error) throw error

                    set({ profile: data })
                } catch (error: any) {
                    console.error('Update profile error:', error)
                    set({ error: error.message })
                    throw error
                } finally {
                    set({ loading: false })
                }
            },

            clearError: () => set({ error: null }),

            resetAuth: () => set({
                session: null,
                user: null,
                profile: null,
                loading: false,
                initialized: false,
                error: null
            }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                initialized: state.initialized
            }),
        }
    )
)