import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/useGameStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { colors, commonStyles } from '@/lib/styles';
import { EVOLUTION_STAGES } from '@/lib/constants';

export default function HomeTab() {
  const { user } = useAuthStore();
  const { level, levelProgress, evolutionStage } = useGameStore();
  const { theme } = useThemeStore();
  const isGameTheme = theme === 'game';

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary }
    ]}>
      <View style={styles.content}>
        {/* ウェルカムセクション */}
        <View style={styles.welcomeSection}>
          <Text style={[
            styles.welcomeText,
            { color: colors.business.text }
          ]}>
            おかえりなさい、
          </Text>
          <Text style={[
            styles.userName,
            isGameTheme && styles.userNameGame
          ]}>
            {user?.name || 'ゲスト'}さん
          </Text>
        </View>

        {/* ステータスカード */}
        <View style={[
          commonStyles.card,
          isGameTheme && commonStyles.cardGame,
          styles.statusCard
        ]}>
          <Text style={styles.sectionTitle}>現在のステータス</Text>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>レベル</Text>
            <Text style={[
              styles.statusValue,
              isGameTheme && styles.statusValueGame
            ]}>
              Lv.{level}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>進化段階</Text>
            <Text style={[
              styles.statusValue,
              { color: isGameTheme ? colors.game.gold : colors.game.primary }
            ]}>
              {EVOLUTION_STAGES[evolutionStage]}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.statusLabel}>次のレベルまで</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${levelProgress * 100}%`,
                    backgroundColor: isGameTheme ? colors.game.exp : colors.game.primary
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{Math.floor(levelProgress * 100)}%</Text>
          </View>
        </View>

        {/* クイックアクション */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
            クイックアクション
          </Text>
          
          <Pressable style={[
            commonStyles.buttonPrimary,
            isGameTheme && commonStyles.shadow
          ]}>
            <Text style={commonStyles.buttonText}>新しいタスクを作成</Text>
          </Pressable>

          <Pressable style={[
            commonStyles.buttonSecondary,
            { marginTop: 12 }
          ]}>
            <Text style={commonStyles.buttonText}>今日のタスクを見る</Text>
          </Pressable>
        </View>

        {/* 統計情報 */}
        <View style={[
          commonStyles.card,
          isGameTheme && commonStyles.cardGame,
          styles.statsCard
        ]}>
          <Text style={styles.sectionTitle}>今週の統計</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>完了タスク</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>850</Text>
              <Text style={styles.statLabel}>獲得EXP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>連続日数</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    opacity: 0.8,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.business.text,
  },
  userNameGame: {
    textShadowColor: colors.game.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statusCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 16,
    color: colors.business.subtext,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.business.text,
  },
  statusValueGame: {
    color: colors.game.gold,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.business.border,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.business.subtext,
    textAlign: 'right',
  },
  quickActions: {
    marginBottom: 24,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.game.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.business.subtext,
  },
});