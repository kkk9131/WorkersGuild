# Database Migrations

This directory contains SQL migration files for the Workers Guild application database setup.

## Migration Files

### 001_create_user_profiles_table.sql
Creates the main `user_profiles` table with:
- **Primary Key**: UUID linked to `auth.users(id)` with CASCADE delete
- **User Information**: username (unique), display_name, role
- **Gamification Fields**: level, experience, evolution_stage
- **Skill Stats**: strength, agility, intelligence, endurance, charisma
- **Profile Data**: avatar_url, bio
- **Timestamps**: created_at, updated_at

**Constraints:**
- Level: 1-100
- Experience: >= 0
- Evolution Stage: 1, 2, 3, or 4
- Skills: 0-100 each
- Role: 'individual', 'leader', or 'member'

**Indexes:**
- Username (unique)
- Role, level, experience, evolution_stage, created_at
- Composite index for leaderboards (level DESC, experience DESC)

### 002_enable_rls_policies.sql
Implements Row Level Security (RLS) policies:
- **View Policy**: Users can only view their own profile
- **Insert Policy**: Users can only create their own profile
- **Update Policy**: Users can only update their own profile
- **Grants**: Authenticated users get SELECT, INSERT, UPDATE permissions

### 003_create_profile_triggers.sql
Sets up automatic database triggers:
- **Profile Creation**: Automatically creates a user profile when a new user registers
- **Username Generation**: Creates unique usernames from email addresses
- **Timestamp Updates**: Automatically updates `updated_at` on profile modifications

## Running Migrations

### Using the Migration Script
```bash
npm run migrate
```

### Manual Execution
You can also run individual migration files directly in your Supabase SQL editor or via the CLI.

## Testing

### Migration Structure Tests
```bash
npm run test -- __tests__/database/migration-structure.test.ts
```

### RLS Policy Tests
```bash
npm run test:rls
```

## Security Features

### Row Level Security (RLS)
- Users can only access their own profile data
- Prevents unauthorized data access at the database level
- Policies are enforced even for direct database queries

### Data Validation
- Database-level constraints ensure data integrity
- Prevents invalid values for levels, skills, and roles
- Automatic timestamp management

### Automatic Profile Creation
- New users automatically get a profile created
- Unique username generation prevents conflicts
- Graceful error handling if profile creation fails

## Database Schema

```sql
user_profiles (
    id UUID PRIMARY KEY,           -- Links to auth.users(id)
    username TEXT UNIQUE NOT NULL, -- Unique username
    display_name TEXT NOT NULL,    -- Display name
    role TEXT DEFAULT 'individual', -- User role
    level INTEGER DEFAULT 1,       -- User level (1-100)
    experience INTEGER DEFAULT 0,  -- Experience points
    evolution_stage INTEGER DEFAULT 1, -- Evolution stage (1-4)
    strength INTEGER DEFAULT 0,    -- Strength skill (0-100)
    agility INTEGER DEFAULT 0,     -- Agility skill (0-100)
    intelligence INTEGER DEFAULT 0, -- Intelligence skill (0-100)
    endurance INTEGER DEFAULT 0,   -- Endurance skill (0-100)
    charisma INTEGER DEFAULT 0,    -- Charisma skill (0-100)
    avatar_url TEXT,               -- Profile picture URL
    bio TEXT,                      -- User biography
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Creation timestamp
    updated_at TIMESTAMPTZ DEFAULT NOW()  -- Last update timestamp
)
```

## Environment Variables

Make sure these environment variables are set:
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (for migrations and testing)

## Troubleshooting

### Common Issues

1. **Migration Fails**: Check that your Supabase connection is working and you have the correct permissions
2. **RLS Policies Not Working**: Ensure RLS is enabled and policies are correctly applied
3. **Profile Not Created**: Check that the trigger is properly installed and auth.users table exists

### Verification Queries

Check if RLS is enabled:
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'user_profiles';
```

Check policies:
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user_profiles';
```

Check triggers:
```sql
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE event_object_table IN ('users', 'user_profiles');
```