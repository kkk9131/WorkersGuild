import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { commonStyles, colors } from '@/lib/styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください。');
      return;
    }

    setLoading(true);
    try {
      // Supabaseでログイン
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        // プロフィール情報を取得
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('プロフィール取得エラー:', profileError);
        }

        // ストアに保存
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: profile?.name || '',
          role: profile?.role || 'individual',
          level: profile?.level || 1,
          exp: profile?.exp || 0,
          skills: profile?.skills || {
            strength: 0,
            technique: 0,
            speed: 0,
            intelligence: 0,
            teamwork: 0,
          },
          evolution_stage: profile?.evolution_stage || 1,
          team_id: profile?.team_id || null,
          created_at: data.user.created_at,
          updated_at: profile?.updated_at || new Date().toISOString(),
        });

        // ホーム画面へ遷移
        router.replace('/tabs');
      }
    } catch (error: any) {
      Alert.alert('ログインエラー', error.message || 'ログインに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>お帰りなさい！</Text>
          <Text style={styles.subtitle}>
            アカウントにログインして続けましょう
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>メールアドレス</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor={colors.business.subtext}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>パスワード</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.business.subtext}
              secureTextEntry
              style={styles.input}
              editable={!loading}
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={[
              styles.button,
              loading && styles.buttonDisabled
            ]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>ログイン</Text>
            )}
          </Pressable>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>アカウントをお持ちでない方は</Text>
            <Link href="/auth/register" asChild>
              <Pressable disabled={loading}>
                <Text style={styles.link}>新規登録</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.business.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.business.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.business.subtext,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.business.text,
    marginBottom: 8,
    fontWeight: '500',
  },
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
  button: {
    backgroundColor: colors.game.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  linkText: {
    color: colors.business.subtext,
    fontSize: 14,
  },
  link: {
    color: colors.game.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});