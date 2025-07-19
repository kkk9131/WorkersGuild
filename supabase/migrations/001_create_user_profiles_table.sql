-- Migration: Create user_profiles table with proper constraints and indexes
-- Description: Sets up the main user profiles table with gamification fields and proper relationships

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT DEFAULT 'individual' CHECK (role IN ('individual', 'leader', 'member')),
    level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 100),
    experience INTEGER DEFAULT 0 CHECK (experience >= 0),
    evolution_stage INTEGER DEFAULT 1 CHECK (evolution_stage IN (1, 2, 3, 4)),
    strength INTEGER DEFAULT 0 CHECK (strength >= 0 AND strength <= 100),
    agility INTEGER DEFAULT 0 CHECK (agility >= 0 AND agility <= 100),
    intelligence INTEGER DEFAULT 0 CHECK (intelligence >= 0 AND intelligence <= 100),
    endurance INTEGER DEFAULT 0 CHECK (endurance >= 0 AND endurance <= 100),
    charisma INTEGER DEFAULT 0 CHECK (charisma >= 0 AND charisma <= 100),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_level ON public.user_profiles(level);
CREATE INDEX IF NOT EXISTS idx_user_profiles_experience ON public.user_profiles(experience);
CREATE INDEX IF NOT EXISTS idx_user_profiles_evolution_stage ON public.user_profiles(evolution_stage);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at);

-- Create composite index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_level_exp ON public.user_profiles(level DESC, experience DESC);

-- Add comment to table
COMMENT ON TABLE public.user_profiles IS 'User profiles with gamification stats and personal information';