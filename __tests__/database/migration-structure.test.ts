import { readFileSync } from 'fs'
import { join } from 'path'

describe('Database Migration Structure', () => {
    const migrationsDir = join(__dirname, '../../supabase/migrations')

    describe('Migration Files', () => {
        it('should have all required migration files', () => {
            const requiredMigrations = [
                '001_create_user_profiles_table.sql',
                '002_enable_rls_policies.sql',
                '003_create_profile_triggers.sql'
            ]

            requiredMigrations.forEach(migrationFile => {
                const migrationPath = join(migrationsDir, migrationFile)
                expect(() => readFileSync(migrationPath, 'utf-8')).not.toThrow()
            })
        })

        it('should contain proper table creation in 001 migration', () => {
            const migration001 = readFileSync(
                join(migrationsDir, '001_create_user_profiles_table.sql'),
                'utf-8'
            )

            // Check for table creation
            expect(migration001).toContain('CREATE TABLE IF NOT EXISTS public.user_profiles')

            // Check for required columns
            expect(migration001).toContain('id UUID PRIMARY KEY')
            expect(migration001).toContain('username TEXT UNIQUE NOT NULL')
            expect(migration001).toContain('display_name TEXT NOT NULL')
            expect(migration001).toContain('role TEXT DEFAULT \'individual\'')
            expect(migration001).toContain('level INTEGER DEFAULT 1')
            expect(migration001).toContain('experience INTEGER DEFAULT 0')
            expect(migration001).toContain('evolution_stage INTEGER DEFAULT 1')

            // Check for skill columns
            expect(migration001).toContain('strength INTEGER DEFAULT 0')
            expect(migration001).toContain('agility INTEGER DEFAULT 0')
            expect(migration001).toContain('intelligence INTEGER DEFAULT 0')
            expect(migration001).toContain('endurance INTEGER DEFAULT 0')
            expect(migration001).toContain('charisma INTEGER DEFAULT 0')

            // Check for constraints
            expect(migration001).toContain('CHECK (level >= 1 AND level <= 100)')
            expect(migration001).toContain('CHECK (experience >= 0)')
            expect(migration001).toContain('CHECK (evolution_stage IN (1, 2, 3, 4))')
            expect(migration001).toContain('CHECK (role IN (\'individual\', \'leader\', \'member\'))')

            // Check for indexes
            expect(migration001).toContain('CREATE INDEX IF NOT EXISTS idx_user_profiles_username')
            expect(migration001).toContain('CREATE INDEX IF NOT EXISTS idx_user_profiles_level_exp')
        })

        it('should contain proper RLS policies in 002 migration', () => {
            const migration002 = readFileSync(
                join(migrationsDir, '002_enable_rls_policies.sql'),
                'utf-8'
            )

            // Check for RLS enablement
            expect(migration002).toContain('ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY')

            // Check for required policies
            expect(migration002).toContain('CREATE POLICY "Users can view own profile"')
            expect(migration002).toContain('CREATE POLICY "Users can insert own profile"')
            expect(migration002).toContain('CREATE POLICY "Users can update own profile"')

            // Check for proper policy conditions
            expect(migration002).toContain('USING (auth.uid() = id)')
            expect(migration002).toContain('WITH CHECK (auth.uid() = id)')

            // Check for grants
            expect(migration002).toContain('GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated')
        })

        it('should contain proper triggers in 003 migration', () => {
            const migration003 = readFileSync(
                join(migrationsDir, '003_create_profile_triggers.sql'),
                'utf-8'
            )

            // Check for trigger functions
            expect(migration003).toContain('CREATE OR REPLACE FUNCTION public.handle_new_user()')
            expect(migration003).toContain('CREATE OR REPLACE FUNCTION public.handle_updated_at()')

            // Check for triggers
            expect(migration003).toContain('CREATE TRIGGER on_auth_user_created')
            expect(migration003).toContain('CREATE TRIGGER on_user_profile_updated')

            // Check for proper trigger timing
            expect(migration003).toContain('AFTER INSERT ON auth.users')
            expect(migration003).toContain('BEFORE UPDATE ON public.user_profiles')

            // Check for username generation logic
            expect(migration003).toContain('default_username := split_part(NEW.email, \'@\', 1)')
            expect(migration003).toContain('WHILE EXISTS (SELECT 1 FROM public.user_profiles WHERE username = final_username)')
        })
    })

    describe('Migration Content Validation', () => {
        it('should have proper SQL syntax in all migrations', () => {
            const migrationFiles = [
                '001_create_user_profiles_table.sql',
                '002_enable_rls_policies.sql',
                '003_create_profile_triggers.sql'
            ]

            migrationFiles.forEach(migrationFile => {
                const migrationContent = readFileSync(
                    join(migrationsDir, migrationFile),
                    'utf-8'
                )

                // Basic SQL syntax checks
                expect(migrationContent).not.toContain('CREAT TABLE') // Common typo
                expect(migrationContent).not.toContain('CREAT INDEX') // Common typo
                expect(migrationContent).not.toContain('CREAT POLICY') // Common typo

                // Check for proper statement termination
                const statements = migrationContent.split(';').filter(s => s.trim())
                expect(statements.length).toBeGreaterThan(0)
            })
        })

        it('should have consistent naming conventions', () => {
            const migration001 = readFileSync(
                join(migrationsDir, '001_create_user_profiles_table.sql'),
                'utf-8'
            )

            // Check for consistent table naming
            expect(migration001).toContain('public.user_profiles')
            expect(migration001).not.toContain('CREATE TABLE IF NOT EXISTS public.user_profile ') // Should be plural

            // Check for consistent index naming
            expect(migration001).toContain('idx_user_profiles_')

            const migration002 = readFileSync(
                join(migrationsDir, '002_enable_rls_policies.sql'),
                'utf-8'
            )

            // Check for consistent policy naming
            expect(migration002).toMatch(/"[A-Z][a-z].*"/) // Policies should start with capital letter
        })
    })
})