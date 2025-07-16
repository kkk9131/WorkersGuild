import { StyleSheet } from 'react-native';

// カラーパレット
export const colors = {
  // ゲームテーマカラー
  game: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#10B981',
    gold: '#F59E0B',
    silver: '#6B7280',
    bronze: '#92400E',
    exp: '#3B82F6',
    hp: '#EF4444',
    mana: '#6366F1',
  },
  // ビジネステーマカラー
  business: {
    primary: '#1F2937',
    secondary: '#374151',
    accent: '#059669',
    text: '#F9FAFB',
    subtext: '#9CA3AF',
    border: '#4B5563',
  },
  // レアリティカラー
  rarity: {
    common: '#6B7280',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B',
  },
  // ステータスカラー
  status: {
    todo: '#6B7280',
    doing: '#3B82F6',
    review: '#F59E0B',
    done: '#10B981',
  },
};

// 共通スタイル
export const commonStyles = StyleSheet.create({
  // コンテナ
  container: {
    flex: 1,
    backgroundColor: colors.business.primary,
  },
  containerGame: {
    flex: 1,
    backgroundColor: colors.game.primary,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  
  // テキスト
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 8,
  },
  titleGame: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: colors.game.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.business.subtext,
    textAlign: 'center',
    marginBottom: 32,
  },
  text: {
    fontSize: 14,
    color: colors.business.text,
  },
  
  // ボタン
  buttonPrimary: {
    backgroundColor: colors.game.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.business.secondary,
    borderWidth: 1,
    borderColor: colors.business.border,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // カード
  card: {
    backgroundColor: colors.business.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.business.border,
  },
  cardGame: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.game.primary,
  },
  
  // 入力フィールド
  input: {
    backgroundColor: colors.business.secondary,
    borderWidth: 1,
    borderColor: colors.business.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.business.text,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.business.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  
  // その他
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  absolute: {
    position: 'absolute',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

// テーマ別スタイルを取得する関数
export function getThemeStyles(theme: 'game' | 'business') {
  return theme === 'game' ? gameStyles : businessStyles;
}

// ゲームテーマスタイル
export const gameStyles = {
  container: commonStyles.containerGame,
  title: commonStyles.titleGame,
  card: commonStyles.cardGame,
  colors: colors.game,
};

// ビジネステーマスタイル
export const businessStyles = {
  container: commonStyles.container,
  title: commonStyles.title,
  card: commonStyles.card,
  colors: colors.business,
};