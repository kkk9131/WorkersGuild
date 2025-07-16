import { BASE_EXP_REQUIREMENT, EXP_MULTIPLIER, EXP_REWARDS, PRIORITY_MULTIPLIERS } from './constants';
import type { TaskPriority, TaskRarity } from '@/types';

// レベルアップに必要なEXPを計算
export function calculateRequiredExp(level: number): number {
  return Math.floor(BASE_EXP_REQUIREMENT * Math.pow(EXP_MULTIPLIER, level - 1));
}

// 現在のレベルを計算
export function calculateLevel(totalExp: number): number {
  let level = 1;
  let requiredExp = BASE_EXP_REQUIREMENT;
  let accumulatedExp = 0;

  while (accumulatedExp + requiredExp <= totalExp && level < 100) {
    accumulatedExp += requiredExp;
    level++;
    requiredExp = calculateRequiredExp(level);
  }

  return level;
}

// レベル内での進捗率を計算（0-1）
export function calculateLevelProgress(totalExp: number): number {
  const level = calculateLevel(totalExp);
  const currentLevelExp = calculateTotalExpForLevel(level - 1);
  const nextLevelExp = calculateTotalExpForLevel(level);
  
  return (totalExp - currentLevelExp) / (nextLevelExp - currentLevelExp);
}

// 特定のレベルまでに必要な累計EXPを計算
export function calculateTotalExpForLevel(level: number): number {
  let totalExp = 0;
  
  for (let i = 1; i <= level; i++) {
    totalExp += calculateRequiredExp(i);
  }
  
  return totalExp;
}

// タスク完了時のEXP報酬を計算
export function calculateTaskExpReward(
  rarity: TaskRarity,
  priority: TaskPriority
): number {
  const baseReward = EXP_REWARDS[rarity];
  const multiplier = PRIORITY_MULTIPLIERS[priority];
  
  return Math.floor(baseReward * multiplier);
}

// 日付フォーマット
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// 相対的な時間表示
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'たった今';
  if (minutes < 60) return `${minutes}分前`;
  if (hours < 24) return `${hours}時間前`;
  if (days < 7) return `${days}日前`;
  
  return formatDate(d);
}

// クラス名を結合するユーティリティ
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}