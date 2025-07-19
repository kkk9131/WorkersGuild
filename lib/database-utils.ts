import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

/**
 * Database utility functions for migrations and testing
 */

export interface MigrationResult {
    success: boolean
    error?: string
    executedAt: Date
}

/**
 * Execute a SQL migration file
 */
export async function executeMigration(
    supabase: SupabaseClient<Database>,
    migrationSql: string,
    migrationName: string
): Promise<MigrationResult> {
    try {
        const { error } = await supabase.rpc('exec_sql', { sql: migrationSql })

        if (error) {
            console.error(`Migration ${migrationName} failed:`, error)
            return {
                success: false,
                error: error.message,
                executedAt: new Date()
            }
        }

        console.log(`Migration ${migrationName} executed successfully`)
        return {
            success: true,
            executedAt: new Date()
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Migration ${migrationName} failed:`, errorMessage)
        return {
            success: false,
            error: errorMessage,
            executedAt: new Date()
        }
    }
}

/**
 * Create an admin Supabase client for testing and migrations
 */
export function createAdminClient(): SupabaseClient<Database> {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Missing Supabase environment variables for admin client')
    }

    return createClient<Database>(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

/**
 * Verify RLS policies are properly configured
 */
export async function verifyRLSPolicies(
    supabase: SupabaseClient<Database>
): Promise<{ table: string; rlsEnabled: boolean; policies: string[] }[]> {
    const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')

    if (error) {
        throw new Error(`Failed to fetch tables: ${error.message}`)
    }

    const results = []

    for (const table of data || []) {
        // Check if RLS is enabled
        const { data: rlsData } = await supabase.rpc('check_rls_enabled', {
            table_name: table.tablename
        })

        // Get policies for the table
        const { data: policiesData } = await supabase.rpc('get_table_policies', {
            table_name: table.tablename
        })

        results.push({
            table: table.tablename,
            rlsEnabled: rlsData || false,
            policies: policiesData || []
        })
    }

    return results
}

/**
 * Clean up test data
 */
export async function cleanupTestData(
    supabase: SupabaseClient<Database>,
    userIds: string[]
): Promise<void> {
    try {
        // Delete user profiles (will cascade to other related data)
        for (const userId of userIds) {
            await supabase.auth.admin.deleteUser(userId)
        }
    } catch (error) {
        console.warn('Error during test cleanup:', error)
    }
}

/**
 * Create a test user with profile
 */
export async function createTestUser(
    supabase: SupabaseClient<Database>,
    email: string,
    password: string = 'testpassword123'
): Promise<{ userId: string; email: string }> {
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    })

    if (error || !data.user) {
        throw new Error(`Failed to create test user: ${error?.message}`)
    }

    // Wait for profile creation trigger
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
        userId: data.user.id,
        email: data.user.email || email
    }
}