# Workers Guild テーマガイド

## 概要

Workers Guildは、建設業界の職人向けに2つのテーマを提供しています：

1. **ゲームテーマ**: RPG風のファンタジーデザインで、作業を楽しくゲーミフィケーション
2. **ビジネステーマ**: プロフェッショナルなダークテーマで、現場での実用性を重視

## カラーパレット

### ゲームテーマ

#### 基本色
- **プライマリ**: `#8B5CF6` (パープル) - メインアクション、重要な要素
- **セカンダリ**: `#EC4899` (ピンク) - サブアクション、アクセント
- **アクセント**: `#10B981` (エメラルド) - 成功、完了状態
- **背景**: グラデーション（パープル → ピンク）

#### ゲーム要素色
- **ゴールド**: `#F59E0B` - レベルアップ、実績
- **シルバー**: `#6B7280` - 通常報酬
- **ブロンズ**: `#92400E` - 初級報酬
- **EXP**: `#3B82F6` (ブルー) - 経験値
- **HP**: `#EF4444` (レッド) - 体力、エラー
- **マナ**: `#6366F1` (インディゴ) - スキルポイント

#### レアリティ色
- **コモン**: `#6B7280` (グレー)
- **レア**: `#3B82F6` (ブルー)
- **エピック**: `#8B5CF6` (パープル)
- **レジェンダリー**: `#F59E0B` (ゴールド) + アニメーション

### ビジネステーマ

#### 基本色
- **プライマリ**: `#1F2937` (グレー900) - 背景
- **セカンダリ**: `#374151` (グレー700) - カード背景
- **アクセント**: `#059669` (エメラルド600) - CTA、成功
- **テキスト**: `#F9FAFB` (グレー50) - メインテキスト
- **サブテキスト**: `#9CA3AF` (グレー400) - 補助テキスト
- **ボーダー**: `#4B5563` (グレー600) - 境界線

## アニメーション

### ゲームテーマ限定
- **グロー効果**: ボタンやカードが光る演出
- **フロート**: 要素がふわふわと浮遊
- **スパークル**: キラキラ効果
- **レベルアップ**: バウンスアニメーション
- **タスク完了**: 回転アニメーション

### ビジネステーマ
- 最小限のアニメーション
- フォーカスは実用性と視認性

## コンポーネント使用方法

### ThemedContainer
```tsx
import { ThemedContainer } from '@/components/common';

// プライマリ背景
<ThemedContainer>
  {/* コンテンツ */}
</ThemedContainer>

// カード背景
<ThemedContainer variant="card">
  {/* カードコンテンツ */}
</ThemedContainer>
```

### ThemedText
```tsx
import { ThemedText } from '@/components/common';

// 見出し
<ThemedText variant="primary" size="2xl" weight="bold">
  見出しテキスト
</ThemedText>

// 本文
<ThemedText variant="secondary" size="base">
  本文テキスト
</ThemedText>
```

### ThemedButton
```tsx
import { ThemedButton } from '@/components/common';

// プライマリボタン
<ThemedButton variant="primary" size="lg">
  アクション
</ThemedButton>

// アニメーション付きボタン（ゲームテーマ時のみ）
<ThemedButton variant="success" animate>
  レベルアップ！
</ThemedButton>
```

### ThemeToggle
```tsx
import { ThemeToggle } from '@/components/ui';

// テーマ切り替えトグル
<ThemeToggle />
```

## テーマ管理

### Zustandストア
```tsx
import { useThemeStore } from '@/stores/useThemeStore';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  
  // 現在のテーマを取得
  console.log(theme); // 'game' or 'business'
  
  // テーマを切り替え
  toggleTheme();
  
  // 特定のテーマに設定
  setTheme('game');
}
```

### テーマスタイル取得
```tsx
import { getThemeStyles } from '@/lib/themes';

function MyComponent() {
  const { theme } = useThemeStore();
  const styles = getThemeStyles(theme);
  
  // テーマに応じたスタイルを適用
  <View className={styles.backgrounds.primary}>
    <Text className={styles.text.primary}>
      テーマ対応テキスト
    </Text>
  </View>
}
```

## デザイン原則

### ゲームテーマ
1. **楽しさ優先**: アニメーションと視覚効果で作業を楽しく
2. **報酬感**: レベルアップやレアリティで達成感を演出
3. **ファンタジー要素**: RPG風の世界観でモチベーション向上

### ビジネステーマ
1. **視認性優先**: 高コントラストで読みやすさ重視
2. **効率性**: 余計な装飾を排除し、作業効率を最大化
3. **プロフェッショナル**: 現場でも違和感のないデザイン

## ベストプラクティス

1. **テーマ対応コンポーネントを使用**: `Themed*`コンポーネントを優先的に使用
2. **条件付きスタイル**: テーマによって異なるスタイルが必要な場合は`theme`を参照
3. **アニメーション**: ゲームテーマ時のみアニメーションを有効化
4. **カラー**: 直接色を指定せず、テーマ定義から参照
5. **永続化**: テーマ設定は自動的にAsyncStorageに保存される