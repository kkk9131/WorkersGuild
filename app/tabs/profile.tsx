import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/useGameStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { supabase } from '@/lib/supabase';
import { colors, commonStyles } from '@/lib/styles';
import { SKILL_TYPES } from '@/lib/constants';

export default function ProfileTab() {
  const router = useRouter();
  const { user, profile, signOut } = useAuthStore();
  const { skills } = useGameStore();
  const { theme, toggleTheme } = useThemeStore();
  const isGameTheme = theme === 'game';

  const handleLogout = async () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしてよろしいですか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'ログアウト',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase.auth.signOut();
              signOut();
              router.replace('/');
            } catch (error) {
              console.error('ログアウトエラー:', error);
            }
          },
        },
      ]
    );
  };

  const skillLabels = {
    strength: '力',
    technique: '技術',
    speed: '速度',
    intelligence: '知能',
    teamwork: 'チームワーク',
  };

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary }
    ]}>
      <View style={styles.content}>
        {/* プロフィール情報 */}
        <View style={[
          commonStyles.card,
          isGameTheme && commonStyles.cardGame,
          styles.profileCard
        ]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.display_name?.charAt(0) || '?'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{profile?.display_name || 'ゲスト'}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={[
                styles.userRole,
                { color: isGameTheme ? colors.game.gold : colors.game.primary }
              ]}>
                {profile?.role === 'individual' ? '個人' :
                  profile?.role === 'leader' ? 'リーダー' : 'メンバー'}
              </Text>
            </View>
          </View>
        </View>

        {/* スキル情報 */}
        <View style={[
          commonStyles.card,
          isGameTheme && commonStyles.cardGame,
          styles.skillsCard
        ]}>
          <Text style={styles.sectionTitle}>スキルステータス</Text>

          {SKILL_TYPES.map((skill) => (
            <View key={skill} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{skillLabels[skill]}</Text>
              <View style={styles.skillBarContainer}>
                <View
                  style={[
                    styles.skillBar,
                    {
                      width: `${skills[skill]}%`,
                      backgroundColor: isGameTheme ? colors.game.exp : colors.game.primary
                    }
                  ]}
                />
              </View>
              <Text style={styles.skillValue}>{skills[skill]}</Text>
            </View>
          ))}
        </View>

        {/* 設定 */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>設定</Text>

          <Pressable
            onPress={toggleTheme}
            style={[commonStyles.buttonSecondary, styles.settingButton]}
          >
            <Text style={commonStyles.buttonText}>
              テーマ: {theme === 'game' ? 'ゲーム' : 'ビジネス'}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            style={[
              commonStyles.buttonSecondary,
              styles.settingButton,
              { borderColor: colors.game.hp }
            ]}
          >
            <Text style={[commonStyles.buttonText, { color: colors.game.hp }]}>
              ログアウト
            </Text>
          </Pressable>
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
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.game.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.business.subtext,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    fontWeight: '600',
  },
  skillsCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 16,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillLabel: {
    width: 100,
    fontSize: 14,
    color: colors.business.text,
  },
  skillBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.business.border,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: 4,
  },
  skillValue: {
    width: 30,
    fontSize: 14,
    color: colors.business.text,
    textAlign: 'right',
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingButton: {
    marginBottom: 12,
  },
});