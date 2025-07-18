export interface Database {
    public: {
        Tables: {
            user_profiles: {
                Row: {
                    id: string
                    username: string
                    display_name: string
                    role: 'individual' | 'leader' | 'member'
                    level: number
                    experience: number
                    evolution_stage: number
                    strength: number
                    agility: number
                    intelligence: number
                    endurance: number
                    charisma: number
                    avatar_url: string | null
                    bio: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username?: string
                    display_name?: string
                    role?: 'individual' | 'leader' | 'member'
                    level?: number
                    experience?: number
                    evolution_stage?: number
                    strength?: number
                    agility?: number
                    intelligence?: number
                    endurance?: number
                    charisma?: number
                    avatar_url?: string | null
                    bio?: string | null
                }
                Update: {
                    username?: string
                    display_name?: string
                    role?: 'individual' | 'leader' | 'member'
                    level?: number
                    experience?: number
                    evolution_stage?: number
                    strength?: number
                    agility?: number
                    intelligence?: number
                    endurance?: number
                    charisma?: number
                    avatar_url?: string | null
                    bio?: string | null
                }
            }
            tasks: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    status: 'todo' | 'doing' | 'review' | 'done'
                    priority: 'low' | 'medium' | 'high' | 'urgent'
                    rarity: 'common' | 'rare' | 'epic' | 'legendary'
                    exp_reward: number
                    assigned_to: string | null
                    created_by: string | null
                    team_id: string | null
                    guild_id: string | null
                    due_date: string | null
                    completed_at: string | null
                    created_at: string
                    updated_at: string
                    tags: string[] | null
                    estimated_hours: number | null
                    actual_hours: number | null
                }
                Insert: {
                    title: string
                    description?: string | null
                    status?: 'todo' | 'doing' | 'review' | 'done'
                    priority?: 'low' | 'medium' | 'high' | 'urgent'
                    rarity?: 'common' | 'rare' | 'epic' | 'legendary'
                    assigned_to?: string | null
                    created_by?: string | null
                    team_id?: string | null
                    guild_id?: string | null
                    due_date?: string | null
                    tags?: string[] | null
                    estimated_hours?: number | null
                }
                Update: {
                    title?: string
                    description?: string | null
                    status?: 'todo' | 'doing' | 'review' | 'done'
                    priority?: 'low' | 'medium' | 'high' | 'urgent'
                    rarity?: 'common' | 'rare' | 'epic' | 'legendary'
                    assigned_to?: string | null
                    due_date?: string | null
                    completed_at?: string | null
                    tags?: string[] | null
                    estimated_hours?: number | null
                    actual_hours?: number | null
                }
            }
            teams: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    leader_id: string | null
                    invite_code: string
                    max_members: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    name: string
                    description?: string | null
                    leader_id?: string | null
                    max_members?: number
                }
                Update: {
                    name?: string
                    description?: string | null
                    leader_id?: string | null
                    max_members?: number
                }
            }
        }
    }
}