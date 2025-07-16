// Supabaseのデータベース型定義
// 実際のスキーマに基づいて自動生成されます

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'individual' | 'leader' | 'member'
          level: number
          exp: number
          skills: {
            strength: number
            technique: number
            speed: number
            intelligence: number
            teamwork: number
          }
          evolution_stage: 1 | 2 | 3 | 4
          team_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: 'individual' | 'leader' | 'member'
          level?: number
          exp?: number
          skills?: {
            strength: number
            technique: number
            speed: number
            intelligence: number
            teamwork: number
          }
          evolution_stage?: 1 | 2 | 3 | 4
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'individual' | 'leader' | 'member'
          level?: number
          exp?: number
          skills?: {
            strength: number
            technique: number
            speed: number
            intelligence: number
            teamwork: number
          }
          evolution_stage?: 1 | 2 | 3 | 4
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'doing' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'critical'
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          exp_reward: number
          skill_rewards: Json | null
          assigned_to: string | null
          team_id: string | null
          created_by: string
          due_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'todo' | 'doing' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          exp_reward: number
          skill_rewards?: Json | null
          assigned_to?: string | null
          team_id?: string | null
          created_by: string
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'doing' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          exp_reward?: number
          skill_rewards?: Json | null
          assigned_to?: string | null
          team_id?: string | null
          created_by?: string
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          leader_id: string
          member_count: number
          total_exp: number
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          leader_id: string
          member_count?: number
          total_exp?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          leader_id?: string
          member_count?: number
          total_exp?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'individual' | 'leader' | 'member'
      task_status: 'todo' | 'doing' | 'review' | 'done'
      task_priority: 'low' | 'medium' | 'high' | 'critical'
      task_rarity: 'common' | 'rare' | 'epic' | 'legendary'
    }
  }
}