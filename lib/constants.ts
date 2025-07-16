// アプリ全体で使用する定数

// レベルシステム
export const MAX_LEVEL = 100;
export const BASE_EXP_REQUIREMENT = 100;
export const EXP_MULTIPLIER = 1.5;

// スキル
export const SKILL_TYPES = [
  'strength',     // 力
  'technique',    // 技術
  'speed',        // 速度
  'intelligence', // 知能
  'teamwork',     // チームワーク
] as const;

export const MAX_SKILL_LEVEL = 100;

// タスク
export const TASK_STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  REVIEW: 'review',
  DONE: 'done',
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const TASK_RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
} as const;

// 進化段階
export const EVOLUTION_STAGES = {
  1: '見習い',
  2: '職人',
  3: '達人',
  4: '伝説',
} as const;

// EXP報酬計算
export const EXP_REWARDS = {
  [TASK_RARITY.COMMON]: 50,
  [TASK_RARITY.RARE]: 100,
  [TASK_RARITY.EPIC]: 200,
  [TASK_RARITY.LEGENDARY]: 500,
} as const;

export const PRIORITY_MULTIPLIERS = {
  [TASK_PRIORITY.LOW]: 0.8,
  [TASK_PRIORITY.MEDIUM]: 1.0,
  [TASK_PRIORITY.HIGH]: 1.5,
  [TASK_PRIORITY.CRITICAL]: 2.0,
} as const;