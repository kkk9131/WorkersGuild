/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ゲームテーマカラー
        game: {
          primary: '#8B5CF6', // パープル
          secondary: '#EC4899', // ピンク
          accent: '#10B981', // エメラルド
          gold: '#F59E0B', // ゴールド
          silver: '#6B7280', // シルバー
          bronze: '#92400E', // ブロンズ
          exp: '#3B82F6', // ブルー（EXP）
          hp: '#EF4444', // レッド（HP）
          mana: '#6366F1', // インディゴ（マナ）
        },
        // ビジネステーマカラー
        business: {
          primary: '#1F2937', // グレー900
          secondary: '#374151', // グレー700
          accent: '#059669', // エメラルド600
          text: '#F9FAFB', // グレー50
          subtext: '#9CA3AF', // グレー400
          border: '#4B5563', // グレー600
        },
        // レアリティカラー
        rarity: {
          common: '#6B7280', // グレー
          rare: '#3B82F6', // ブルー
          epic: '#8B5CF6', // パープル
          legendary: '#F59E0B', // ゴールド
        },
        // ステータスカラー
        status: {
          todo: '#6B7280', // グレー
          doing: '#3B82F6', // ブルー
          review: '#F59E0B', // アンバー
          done: '#10B981', // グリーン
        },
      },
      fontFamily: {
        // ゲーム用フォント
        game: ['Orbitron', 'sans-serif'],
        // ビジネス用フォント
        business: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
            filter: 'brightness(1.2)',
          },
          '100%': { 
            textShadow: '0 0 20px rgba(139, 92, 246, 1), 0 0 30px rgba(139, 92, 246, 0.8)',
            filter: 'brightness(1.5)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

