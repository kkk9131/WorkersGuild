import { supabase } from './supabase'
import { Database } from '../types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export interface ProfileCreationResult {
    success: boolean
    profile?: UserProfile
    error?: string
    needsManualCreation?: boolean
}

/**
 * Ensures a user profile exists, creating one if necessary
 */
export async function ensureUserProfile(userId: string, fallbackData?: {
    username?: string
    display_name?: string
    email?: string
}): Promise<ProfileCreationResult> {
    try {
        // First, try to fetch existing profile
        const { data: existingProfile, error: fetchError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (existingProfile) {
            return { success: true, profile: existingProfile }
        }

        // If profile doesn't exist (PGRST116 = no rows returned)
        if (fetchError?.code === 'PGRST116') {
            console.log('Profile not found, creating new profile...')

            // Generate unique username
            const baseUsername = fallbackData?.username ||
                fallbackData?.email?.split('@')[0] ||
                'user'

            const username = await generateUniqueUsername(baseUsername)
            const displayName = fallbackData?.display_name ||
                fallbackData?.email?.split('@')[0] ||
                'New User'

            // Try to create profile
            const { data: newProfile, error: createError } = await supabase
                .from('user_profiles')
                .insert({
                    id: userId,
                    username,
                    display_name: displayName,
                })
                .select()
                .single()

            if (createError) {
                console.error('Failed to create profile:', createError)
                return {
                    success: false,
                    error: createError.message,
                    needsManualCreation: true
                }
            }

            return { success: true, profile: newProfile }
        }

        // Other fetch errors
        return {
            success: false,
            error: fetchError?.message || 'Unknown error fetching profile'
        }

    } catch (error: any) {
        console.error('Profile creation error:', error)
        return {
            success: false,
            error: error.message,
            needsManualCreation: true
        }
    }
}

/**
 * Generates a unique username by checking existing usernames
 */
export async function generateUniqueUsername(baseUsername: string): Promise<string> {
    // Clean the base username
    let cleanBase = baseUsername
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20)

    if (!cleanBase) {
        cleanBase = 'user'
    }

    let username = cleanBase
    let counter = 1

    // Check if username exists
    while (counter <= 100) { // Prevent infinite loop
        const { data, error } = await supabase
            .from('user_profiles')
            .select('username')
            .eq('username', username)
            .single()

        // If no data returned, username is available
        if (error?.code === 'PGRST116') {
            return username
        }

        // If username exists, try with counter
        username = `${cleanBase}${counter}`
        counter++
    }

    // Fallback to timestamp-based username
    return `user_${Date.now().toString().slice(-8)}`
}

/**
 * Validates profile data before creation/update
 */
export function validateProfileData(data: {
    username?: string
    display_name?: string
}): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (data.username) {
        if (data.username.length < 3) {
            errors.push('Username must be at least 3 characters long')
        }
        if (data.username.length > 50) {
            errors.push('Username must be less than 50 characters')
        }
        if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
            errors.push('Username can only contain letters, numbers, and underscores')
        }
    }

    if (data.display_name) {
        if (data.display_name.length < 1) {
            errors.push('Display name is required')
        }
        if (data.display_name.length > 100) {
            errors.push('Display name must be less than 100 characters')
        }
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

/**
 * Retry profile creation with exponential backoff
 */
export async function retryProfileCreation(
    userId: string,
    userData: { username: string; display_name: string },
    maxRetries: number = 3
): Promise<ProfileCreationResult> {
    let lastError: string = ''

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`Profile creation attempt ${attempt}/${maxRetries}`)

        const result = await ensureUserProfile(userId, userData)

        if (result.success) {
            return result
        }

        lastError = result.error || 'Unknown error'

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s
            await new Promise(resolve => setTimeout(resolve, delay))
        }
    }

    return {
        success: false,
        error: `Failed after ${maxRetries} attempts. Last error: ${lastError}`,
        needsManualCreation: true
    }
}