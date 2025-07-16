import { View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedContainer, ThemedText, ThemedButton } from '@/components/common';
import { ThemeToggle } from '@/components/ui';
import { useThemeStore } from '@/stores/useThemeStore';

export default function HomeScreen() {
  const { theme } = useThemeStore();

  return (
    <ThemedContainer className="items-center justify-center p-6">
      {/* テーマ切り替えボタン（右上） */}
      <View className="absolute top-16 right-6">
        <ThemeToggle />
      </View>

      <View className="items-center mb-8">
        <ThemedText variant="primary" size="4xl" weight="bold" className="mb-2">
          Workers Guild
        </ThemedText>
        <ThemedText variant="secondary" size="lg" className="text-center">
          建設業界のための{'\n'}ゲーミフィケーションタスク管理
        </ThemedText>
      </View>

      <View className="w-full max-w-sm space-y-4">
        <Link href="/auth/login" asChild>
          <ThemedButton variant="primary" size="lg" className="w-full">
            ログイン
          </ThemedButton>
        </Link>

        <Link href="/auth/register" asChild>
          <ThemedButton variant="secondary" size="lg" className="w-full">
            新規登録
          </ThemedButton>
        </Link>

        {/* デモページへのリンク */}
        <Link href="/demo" asChild>
          <ThemedButton 
            variant={theme === 'game' ? 'success' : 'secondary'} 
            size="md" 
            className="w-full mt-8"
          >
            テーマデモを見る
          </ThemedButton>
        </Link>
      </View>

      <View className="absolute bottom-10">
        <ThemedText variant="muted" size="sm">
          Version 1.0.0
        </ThemedText>
      </View>
    </ThemedContainer>
  );
}