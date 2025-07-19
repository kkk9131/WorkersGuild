-- Migration: Create triggers for automatic profile management
-- Description: Sets up triggers for automatic profile creation and updated_at timestamp management

-- Function to handle automatic profile creation when a new user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_username TEXT;
    username_counter INTEGER := 1;
    final_username TEXT;
BEGIN
    -- Generate a default username from email or use a generic format
    IF NEW.email IS NOT NULL THEN
        default_username := split_part(NEW.email, '@', 1);
        -- Remove any non-alphanumeric characters and convert to lowercase
        default_username := lower(regexp_replace(default_username, '[^a-zA-Z0-9]', '', 'g'));
    ELSE
        default_username := 'user';
    END IF;
    
    -- Ensure username is unique by appending a number if necessary
    final_username := default_username;
    WHILE EXISTS (SELECT 1 FROM public.user_profiles WHERE username = final_username) LOOP
        final_username := default_username || username_counter::text;
        username_counter := username_counter + 1;
    END LOOP;
    
    -- Insert the new user profile with default values
    INSERT INTO public.user_profiles (
        id,
        username,
        display_name,
        role,
        level,
        experience,
        evolution_stage,
        strength,
        agility,
        intelligence,
        endurance,
        charisma
    ) VALUES (
        NEW.id,
        final_username,
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email, final_username),
        COALESCE(NEW.raw_user_meta_data->>'role', 'individual'),
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0
    );
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Failed to create user profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile when a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update the updated_at timestamp on profile updates
CREATE TRIGGER on_user_profile_updated
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Add comments to functions and triggers
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a user profile when a new user registers';
COMMENT ON FUNCTION public.handle_updated_at() IS 'Automatically updates the updated_at timestamp on record updates';
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 'Creates user profile automatically on user registration';
COMMENT ON TRIGGER on_user_profile_updated ON public.user_profiles IS 'Updates timestamp on profile modifications';