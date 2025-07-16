import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Database } from '../types/database'

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
                    })

                    if (error) throw error

                    // Create user profile
                    if (data.user) {
                        const { error: profileError } = await supabase
                            .from('user_profiles')
                            .insert({
                                id: data.user.id,
                                username: userData.username,
                                display_name: userData.display_name,
                            })

                        if (profileError) throw profileError
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

                    const { data, error } = await supabase
                        .from('user_profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (error) {
                        console.error('Fetch profile error:', error)
                        return
                    }

                    set({ profile: data })
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