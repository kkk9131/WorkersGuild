import type { Theme } from '@/stores/useThemeStore';

// テーマごとのスタイル定義
export const themes = {
  game: {
    // 背景色
    backgrounds: {
      primary: 'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800',
      secondary: 'bg-gradient-to-br from-purple-800 to-purple-700',
      card: 'bg-purple-900/90 backdrop-blur-sm border border-purple-500/30',
      overlay: 'bg-black/80 backdrop-blur-md',
    },
    
    // テキスト色
    text: {
      primary: 'text-purple-100',
      secondary: 'text-purple-300',
      accent: 'text-pink-400',
      muted: 'text-purple-400',
    },
    
    // ボタンスタイル
    buttons: {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50',
      secondary: 'bg-purple-800/80 border-2 border-purple-500',
      success: 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/50',
      danger: 'bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-500/50',
    },
    
    // 特殊効果
    effects: {
      glow: 'shadow-lg shadow-purple-500/50',
      border: 'border-2 border-purple-500/50',
      gradient: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
    
    // ステータスバー
    statusBar: 'light',
    
    // レアリティ色（ゲームテーマ用）
    rarity: {
      common: 'border-gray-400 bg-gray-900/50 text-gray-300',
      rare: 'border-blue-400 bg-blue-900/50 text-blue-300',
      epic: 'border-purple-400 bg-purple-900/50 text-purple-300',
      legendary: 'border-yellow-400 bg-yellow-900/50 text-yellow-300 animate-pulse-slow',
    },
  },
  
  business: {
    // 背景色
    backgrounds: {
      primary: 'bg-business-primary',
      secondary: 'bg-business-secondary',
      card: 'bg-business-secondary border border-business-border',
      overlay: 'bg-black/70',
    },
    
    // テキスト色
    text: {
      primary: 'text-business-text',
      secondary: 'text-business-subtext',
      accent: 'text-business-accent',
      muted: 'text-gray-500',
    },
    
    // ボタンスタイル
    buttons: {
      primary: 'bg-business-accent',
      secondary: 'bg-business-secondary border border-business-border',
      success: 'bg-green-600',
      danger: 'bg-red-600',
    },
    
    // 特殊効果
    effects: {
      glow: '',
      border: 'border border-business-border',
      gradient: 'bg-business-accent',
    },
    
    // ステータスバー
    statusBar: 'light',
    
    // レアリティ色（ビジネステーマ用）
    rarity: {
      common: 'border-gray-600 bg-gray-800 text-gray-300',
      rare: 'border-blue-600 bg-blue-900 text-blue-300',
      epic: 'border-purple-600 bg-purple-900 text-purple-300',
      legendary: 'border-yellow-600 bg-yellow-900 text-yellow-300',
    },
  },
} as const;

// テーマヘルパー関数
export function getThemeStyles(theme: Theme) {
  return themes[theme];
}

// アニメーション設定
export const animations = {
  game: {
    levelUp: 'animate-bounce',
    expGain: 'animate-pulse',
    taskComplete: 'animate-spin',
    glow: 'animate-glow',
    float: 'animate-float',
    sparkle: 'animate-sparkle',
  },
  business: {
    levelUp: 'animate-none',
    expGain: 'animate-none',
    taskComplete: 'animate-none',
    glow: '',
    float: '',
    sparkle: '',
  },
};

// フォント設定
export const fonts = {
  game: {
    heading: 'font-game',
    body: 'font-game',
  },
  business: {
    heading: 'font-business',
    body: 'font-business',
  },
};