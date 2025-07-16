import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Skills } from '@/types';
import { calculateLevel, calculateLevelProgress } from '@/lib/utils';

interface GameState {
  // プレイヤーステータス
  totalExp: number;
  skills: Skills;
  evolutionStage: 1 | 2 | 3 | 4;
  
  // 計算値（永続化しない）
  level: number;
  levelProgress: number;
  
  // Actions
  addExp: (amount: number) => void;
  updateSkill: (skill: keyof Skills, value: number) => void;
  updateSkills: (skills: Partial<Skills>) => void;
  evolve: () => void;
  resetProgress: () => void;
}

const initialSkills: Skills = {
  strength: 0,
  technique: 0,
  speed: 0,
  intelligence: 0,
  teamwork: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      totalExp: 0,
      skills: initialSkills,
      evolutionStage: 1,
      level: 1,
      levelProgress: 0,

      addExp: (amount) =>
        set((state) => {
          const newTotalExp = state.totalExp + amount;
          const newLevel = calculateLevel(newTotalExp);
          const newLevelProgress = calculateLevelProgress(newTotalExp);
          
          // レベルアップ時の進化チェック
          let newEvolutionStage = state.evolutionStage;
          if (newLevel >= 25 && state.evolutionStage === 1) newEvolutionStage = 2;
          else if (newLevel >= 50 && state.evolutionStage === 2) newEvolutionStage = 3;
          else if (newLevel >= 75 && state.evolutionStage === 3) newEvolutionStage = 4;
          
          return {
            totalExp: newTotalExp,
            level: newLevel,
            levelProgress: newLevelProgress,
            evolutionStage: newEvolutionStage,
          };
        }),

      updateSkill: (skill, value) =>
        set((state) => ({
          skills: {
            ...state.skills,
            [skill]: Math.min(100, Math.max(0, value)),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          skills: {
            ...state.skills,
            ...Object.entries(skills).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: Math.min(100, Math.max(0, value || 0)),
              }),
              {}
            ),
          },
        })),

      evolve: () =>
        set((state) => ({
          evolutionStage: Math.min(4, state.evolutionStage + 1) as 1 | 2 | 3 | 4,
        })),

      resetProgress: () =>
        set({
          totalExp: 0,
          skills: initialSkills,
          evolutionStage: 1,
          level: 1,
          levelProgress: 0,
        }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        totalExp: state.totalExp,
        skills: state.skills,
        evolutionStage: state.evolutionStage,
      }),
      onRehydrateStorage: () => (state) => {
        // 永続化されたデータから計算値を復元
        if (state) {
          state.level = calculateLevel(state.totalExp);
          state.levelProgress = calculateLevelProgress(state.totalExp);
        }
      },
    }
  )
);