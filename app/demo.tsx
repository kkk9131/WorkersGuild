import { ScrollView, View } from 'react-native';
import { ThemedContainer, ThemedText, ThemedButton } from '@/components/common';
import { ThemeToggle, Card } from '@/components/ui';
import { useThemeStore } from '@/stores/useThemeStore';
import { getThemeStyles } from '@/lib/themes';

export default function DemoScreen() {
  const { theme } = useThemeStore();
  const themeStyles = getThemeStyles(theme);

  return (
    <ThemedContainer>
      <ScrollView className="flex-1 p-6">
        {/* ヘッダー */}
        <View className="items-center mb-8">
          <ThemedText variant="primary" size="3xl" weight="bold">
            テーマデモ
          </ThemedText>
          <ThemedText variant="secondary" size="lg" className="mt-2">
            {theme === 'game' ? 'ゲームテーマ' : 'ビジネステーマ'}
          </ThemedText>
          
          {/* テーマ切り替えトグル */}
          <View className="mt-6">
            <ThemeToggle />
          </View>
        </View>

        {/* カラーパレット */}
        <Card variant={theme === 'game' ? 'default' : 'bordered'} className="mb-6">
          <ThemedText variant="primary" size="xl" weight="semibold" className="mb-4">
            カラーパレット
          </ThemedText>
          
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className={`w-8 h-8 rounded ${theme === 'game' ? 'bg-purple-600' : 'bg-business-accent'} mr-3`} />
              <ThemedText variant="primary">プライマリカラー</ThemedText>
            </View>
            
            <View className="flex-row items-center">
              <View className={`w-8 h-8 rounded ${theme === 'game' ? 'bg-pink-600' : 'bg-business-secondary'} mr-3`} />
              <ThemedText variant="secondary">セカンダリカラー</ThemedText>
            </View>
            
            <View className="flex-row items-center">
              <View className={`w-8 h-8 rounded ${theme === 'game' ? 'bg-purple-400' : 'bg-gray-400'} mr-3`} />
              <ThemedText variant="muted">ミュートカラー</ThemedText>
            </View>
          </View>
        </Card>

        {/* ボタンスタイル */}
        <Card variant={theme === 'game' ? 'default' : 'bordered'} className="mb-6">
          <ThemedText variant="primary" size="xl" weight="semibold" className="mb-4">
            ボタンスタイル
          </ThemedText>
          
          <View className="space-y-3">
            <ThemedButton variant="primary">
              プライマリボタン
            </ThemedButton>
            
            <ThemedButton variant="secondary">
              セカンダリボタン
            </ThemedButton>
            
            <ThemedButton variant="success">
              成功ボタン
            </ThemedButton>
            
            <ThemedButton variant="danger">
              危険ボタン
            </ThemedButton>
            
            <ThemedButton variant="primary" disabled>
              無効化ボタン
            </ThemedButton>
          </View>
        </Card>

        {/* テキストスタイル */}
        <Card variant={theme === 'game' ? 'default' : 'bordered'} className="mb-6">
          <ThemedText variant="primary" size="xl" weight="semibold" className="mb-4">
            テキストスタイル
          </ThemedText>
          
          <View className="space-y-2">
            <ThemedText variant="primary" size="4xl" weight="bold">
              見出し（4xl）
            </ThemedText>
            <ThemedText variant="primary" size="2xl" weight="semibold">
              サブ見出し（2xl）
            </ThemedText>
            <ThemedText variant="secondary" size="lg">
              本文テキスト（lg）
            </ThemedText>
            <ThemedText variant="accent" size="base">
              アクセントテキスト（base）
            </ThemedText>
            <ThemedText variant="muted" size="sm">
              補助テキスト（sm）
            </ThemedText>
          </View>
        </Card>

        {/* レアリティカード */}
        <Card variant={theme === 'game' ? 'default' : 'bordered'} className="mb-20">
          <ThemedText variant="primary" size="xl" weight="semibold" className="mb-4">
            レアリティ表示
          </ThemedText>
          
          <View className="space-y-3">
            <View className={`p-3 rounded-lg ${themeStyles.rarity.common}`}>
              <ThemedText>コモン</ThemedText>
            </View>
            
            <View className={`p-3 rounded-lg ${themeStyles.rarity.rare}`}>
              <ThemedText>レア</ThemedText>
            </View>
            
            <View className={`p-3 rounded-lg ${themeStyles.rarity.epic}`}>
              <ThemedText>エピック</ThemedText>
            </View>
            
            <View className={`p-3 rounded-lg ${themeStyles.rarity.legendary}`}>
              <ThemedText>レジェンダリー</ThemedText>
            </View>
          </View>
        </Card>
      </ScrollView>
    </ThemedContainer>
  );
}