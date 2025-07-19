import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/stores/useThemeStore';
import { colors } from '@/lib/styles';

export default function TasksTab() {
  const { theme } = useThemeStore();
  const isGameTheme = theme === 'game';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary }
    ]}>
      <Text style={styles.title}>タスク管理</Text>
      <Text style={styles.subtitle}>タスク機能は開発中です</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.business.subtext,
  },
});