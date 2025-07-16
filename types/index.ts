// ユーザー関連
export type UserRole = 'individual' | 'leader' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  level: number;
  exp: number;
  skills: Skills;
  evolution_stage: 1 | 2 | 3 | 4;
  team_id?: string;
  created_at: string;
  updated_at: string;
}

// スキル関連
export interface Skills {
  strength: number;      // 力
  technique: number;     // 技術
  speed: number;         // 速度
  intelligence: number;  // 知能
  teamwork: number;      // チームワーク
}

export type SkillType = keyof Skills;

// タスク関連
export type TaskStatus = 'todo' | 'doing' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  rarity: TaskRarity;
  exp_reward: number;
  skill_rewards?: Partial<Skills>;
  assigned_to?: string;
  team_id?: string;
  created_by: string;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// チーム関連
export interface Team {
  id: string;
  name: string;
  description?: string;
  leader_id: string;
  member_count: number;
  total_exp: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  joined_at: string;
  contribution_exp: number;
}

// ギルド関連
export interface Guild {
  id: string;
  name: string;
  description?: string;
  banner_url?: string;
  team_count: number;
  total_exp: number;
  level: number;
  created_at: string;
  updated_at: string;
}

// 実績関連
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: TaskRarity;
  exp_reward: number;
  unlocked_at?: string;
}

// 通知関連
export interface Notification {
  id: string;
  user_id: string;
  type: 'task_assigned' | 'level_up' | 'achievement' | 'team_invite' | 'general';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  created_at: string;
}