-- Migration: Enable Row Level Security (RLS) policies for user_profiles table
-- Description: Implements comprehensive security policies to ensure users can only access their own data

-- Enable Row Level Security on user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT 
    USING (auth.uid() = id);

-- Policy: Users can insert their own profile (for registration)
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy: Users cannot delete their own profile (prevent accidental deletion)
-- Profile deletion should be handled through auth.users deletion which cascades

-- Policy: Team leaders can view profiles of their team members
-- This will be implemented in a future migration when teams table is created

-- Policy: Allow public read access to basic profile info for leaderboards (optional)
-- Uncomment the following policy if you want to allow public leaderboard access
-- CREATE POLICY "Public can view basic profile info" ON public.user_profiles
--     FOR SELECT 
--     USING (true)
--     WITH (username, display_name, level, experience, evolution_stage);

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add comments to policies
COMMENT ON POLICY "Users can view own profile" ON public.user_profiles IS 'Allows users to read their own profile data';
COMMENT ON POLICY "Users can insert own profile" ON public.user_profiles IS 'Allows users to create their own profile during registration';
COMMENT ON POLICY "Users can update own profile" ON public.user_profiles IS 'Allows users to modify their own profile information';