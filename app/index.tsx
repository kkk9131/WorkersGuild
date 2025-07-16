import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { commonStyles, colors } from '@/lib/styles';
import { useThemeStore } from '@/stores/useThemeStore';

export default function HomeScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const isGameTheme = theme === 'game';

  return (
    <View style={[
      commonStyles.centerContainer,
      { backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary }
    ]}>
      <StatusBar style="light" />
      
      {/* テーマ切り替えボタン */}
      <Pressable 
        onPress={toggleTheme}
        style={[commonStyles.absolute, { top: 60, right: 20 }]}
      >
        <View style={[
          commonStyles.card,
          { paddingVertical: 8, paddingHorizontal: 16 }
        ]}>
          <Text style={commonStyles.text}>
            {isGameTheme ? '🎮 ゲーム' : '💼 ビジネス'}
          </Text>
        </View>
      </Pressable>

      <Text style={isGameTheme ? commonStyles.titleGame : commonStyles.title}>
        Workers Guild
      </Text>
      <Text style={commonStyles.subtitle}>
        建設業界のための{'\n'}ゲーミフィケーションタスク管理
      </Text>

      <View style={{ width: '100%', maxWidth: 320 }}>
        <Link href="/demo" asChild>
          <Pressable style={[
            commonStyles.buttonPrimary,
            { marginBottom: 16 },
            isGameTheme && commonStyles.shadow
          ]}>
            <Text style={commonStyles.buttonText}>テーマデモ</Text>
          </Pressable>
        </Link>

        <Link href="/auth/login" asChild>
          <Pressable style={[
            commonStyles.buttonPrimary,
            { marginBottom: 16 }
          ]}>
            <Text style={commonStyles.buttonText}>ログイン</Text>
          </Pressable>
        </Link>

        <Link href="/auth/register" asChild>
          <Pressable style={commonStyles.buttonSecondary}>
            <Text style={commonStyles.buttonText}>新規登録</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={[
        commonStyles.absolute,
        { bottom: 40, color: colors.business.subtext, fontSize: 12 }
      ]}>
        Version 1.0.0
      </Text>
    </View>
  );
}