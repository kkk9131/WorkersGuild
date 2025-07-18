#!/usr/bin/env ts-node

/**
 * Migration runner script
 * Usage: npx ts-node scripts/run-migrations.ts
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createAdminClient, executeMigration } from '../lib/database-utils'

const MIGRATIONS_DIR = join(__dirname, '../supabase/migrations')

const migrations = [
    '001_create_user_profiles_table.sql',
    '002_enable_rls_policies.sql',
    '003_create_profile_triggers.sql'
]

async function runMigrations() {
    console.log('🚀 Starting database migrations...')

    const supabase = createAdminClient()

    for (const migrationFile of migrations) {
        const migrationPath = join(MIGRATIONS_DIR, migrationFile)

        try {
            const migrationSql = readFileSync(migrationPath, 'utf-8')
            console.log(`📄 Executing migration: ${migrationFile}`)

            const result = await executeMigration(supabase, migrationSql, migrationFile)

            if (result.success) {
                console.log(`✅ Migration ${migrationFile} completed successfully`)
            } else {
                console.error(`❌ Migration ${migrationFile} failed: ${result.error}`)
                process.exit(1)
            }
        } catch (error) {
            console.error(`❌ Failed to read migration file ${migrationFile}:`, error)
            process.exit(1)
        }
    }

    console.log('🎉 All migrations completed successfully!')
}

// Run migrations if this script is executed directly
if (require.main === module) {
    runMigrations().catch((error) => {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    })
}

export { runMigrations }