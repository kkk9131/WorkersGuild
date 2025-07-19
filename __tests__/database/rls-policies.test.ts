import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Test configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'test-service-key'
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key'

describe('RLS Policies for user_profiles', () => {
    let supabaseAdmin: SupabaseClient<Database>
    let supabaseClient: SupabaseClient<Database>
    let testUser1Id: string
    let testUser2Id: string

    beforeAll(async () => {
        // Create admin client for setup
        supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })

        // Create regular client for testing
        supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })
    })

    beforeEach(async () => {
        // Create test users using admin client
        const { data: user1, error: error1 } = await supabaseAdmin.auth.admin.createUser({
            email: 'testuser1@example.com',
            password: 'testpassword123',
            email_confirm: true
        })

        const { data: user2, error: error2 } = await supabaseAdmin.auth.admin.createUser({
            email: 'testuser2@example.com',
            password: 'testpassword123',
            email_confirm: true
        })

        if (error1 || error2 || !user1?.user || !user2?.user) {
            throw new Error('Failed to create test users')
        }

        testUser1Id = user1.user.id
        testUser2Id = user2.user.id

        // Wait a bit for triggers to create profiles
        await new Promise(resolve => setTimeout(resolve, 1000))
    })

    afterEach(async () => {
        // Clean up test users
        if (testUser1Id) {
            await supabaseAdmin.auth.admin.deleteUser(testUser1Id)
        }
        if (testUser2Id) {
            await supabaseAdmin.auth.admin.deleteUser(testUser2Id)
        }
    })

    describe('Profile Creation Trigger', () => {
        it('should automatically create a profile when a user registers', async () => {
            // Check if profiles were created by the trigger
            const { data: profile1, error: error1 } = await supabaseAdmin
                .from('user_profiles')
                .select('*')
                .eq('id', testUser1Id)
                .single()

            const { data: profile2, error: error2 } = await supabaseAdmin
                .from('user_profiles')
                .select('*')
                .eq('id', testUser2Id)
                .single()

            expect(error1).toBeNull()
            expect(error2).toBeNull()
            expect(profile1).toBeTruthy()
            expect(profile2).toBeTruthy()
            expect(profile1?.username).toBeTruthy()
            expect(profile1?.display_name).toBeTruthy()
            expect(profile1?.level).toBe(1)
            expect(profile1?.experience).toBe(0)
            expect(profile1?.evolution_stage).toBe(1)
        })

        it('should create unique usernames for users with similar emails', async () => {
            const { data: profiles } = await supabaseAdmin
                .from('user_profiles')
                .select('username')
                .in('id', [testUser1Id, testUser2Id])

            expect(profiles).toHaveLength(2)
            expect(profiles?.[0].username).not.toBe(profiles?.[1].username)
        })
    })

    describe('RLS Policy: Users can view own profile', () => {
        it('should allow users to view their own profile', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to fetch own profile
            const { data, error } = await supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('id', testUser1Id)
                .single()

            expect(error).toBeNull()
            expect(data).toBeTruthy()
            expect(data?.id).toBe(testUser1Id)

            await supabaseClient.auth.signOut()
        })

        it('should prevent users from viewing other users profiles', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to fetch another user's profile
            const { data, error } = await supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('id', testUser2Id)
                .single()

            expect(data).toBeNull()
            // Should return no rows due to RLS, not an error
            expect(error?.code).toBe('PGRST116') // No rows returned

            await supabaseClient.auth.signOut()
        })

        it('should prevent anonymous users from viewing profiles', async () => {
            // Ensure no user is signed in
            await supabaseClient.auth.signOut()

            const { data, error } = await supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('id', testUser1Id)
                .single()

            expect(data).toBeNull()
            expect(error).toBeTruthy()
        })
    })

    describe('RLS Policy: Users can update own profile', () => {
        it('should allow users to update their own profile', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Update own profile
            const { data, error } = await supabaseClient
                .from('user_profiles')
                .update({
                    display_name: 'Updated Name',
                    bio: 'Updated bio'
                })
                .eq('id', testUser1Id)
                .select()
                .single()

            expect(error).toBeNull()
            expect(data?.display_name).toBe('Updated Name')
            expect(data?.bio).toBe('Updated bio')

            await supabaseClient.auth.signOut()
        })

        it('should prevent users from updating other users profiles', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to update another user's profile
            const { data, error } = await supabaseClient
                .from('user_profiles')
                .update({
                    display_name: 'Hacked Name'
                })
                .eq('id', testUser2Id)
                .select()

            expect(data).toEqual([]) // No rows affected
            expect(error).toBeNull() // RLS prevents update but doesn't throw error

            await supabaseClient.auth.signOut()
        })

        it('should update the updated_at timestamp on profile updates', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Get original timestamp
            const { data: originalProfile } = await supabaseClient
                .from('user_profiles')
                .select('updated_at')
                .eq('id', testUser1Id)
                .single()

            // Wait a moment to ensure timestamp difference
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Update profile
            const { data: updatedProfile } = await supabaseClient
                .from('user_profiles')
                .update({ bio: 'New bio' })
                .eq('id', testUser1Id)
                .select('updated_at')
                .single()

            expect(new Date(updatedProfile?.updated_at || '').getTime())
                .toBeGreaterThan(new Date(originalProfile?.updated_at || '').getTime())

            await supabaseClient.auth.signOut()
        })
    })

    describe('Data Validation Constraints', () => {
        it('should enforce level constraints (1-100)', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to set invalid level
            const { error } = await supabaseClient
                .from('user_profiles')
                .update({ level: 101 })
                .eq('id', testUser1Id)

            expect(error).toBeTruthy()
            expect(error?.message).toContain('check constraint')

            await supabaseClient.auth.signOut()
        })

        it('should enforce skill constraints (0-100)', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to set invalid strength value
            const { error } = await supabaseClient
                .from('user_profiles')
                .update({ strength: -1 })
                .eq('id', testUser1Id)

            expect(error).toBeTruthy()
            expect(error?.message).toContain('check constraint')

            await supabaseClient.auth.signOut()
        })

        it('should enforce role constraints', async () => {
            // Sign in as user 1
            const { error: signInError } = await supabaseClient.auth.signInWithPassword({
                email: 'testuser1@example.com',
                password: 'testpassword123'
            })
            expect(signInError).toBeNull()

            // Try to set invalid role
            const { error } = await supabaseClient
                .from('user_profiles')
                .update({ role: 'invalid_role' as any })
                .eq('id', testUser1Id)

            expect(error).toBeTruthy()
            expect(error?.message).toContain('check constraint')

            await supabaseClient.auth.signOut()
        })
    })
})