import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { commonStyles, colors } from '@/lib/styles';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleRegister = async () => {
    // バリデーション
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('エラー', 'すべての項目を入力してください。');
      return;
    }

    if (password.length < 6) {
      Alert.alert('エラー', 'パスワードは6文字以上で入力してください。');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません。');
      return;
    }

    setLoading(true);
    try {
      // Supabaseで新規登録
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // プロフィールテーブルにレコードを作成
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: name.trim(),
            role: 'individual',
            level: 1,
            exp: 0,
            skills: {
              strength: 0,
              technique: 0,
              speed: 0,
              intelligence: 0,
              teamwork: 0,
            },
            evolution_stage: 1,
          });

        if (profileError) {
          console.error('プロフィール作成エラー:', profileError);
          // プロフィール作成に失敗してもユーザーは作成されているので続行
        }

        // ストアに保存
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: name.trim(),
          role: 'individual',
          level: 1,
          exp: 0,
          skills: {
            strength: 0,
            technique: 0,
            speed: 0,
            intelligence: 0,
            teamwork: 0,
          },
          evolution_stage: 1,
          team_id: null,
          created_at: data.user.created_at,
          updated_at: new Date().toISOString(),
        });

        Alert.alert(
          '登録完了',
          'アカウントが作成されました。',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/tabs'),
            },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('登録エラー', error.message || '登録に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>新規登録</Text>
            <Text style={styles.subtitle}>
              Workers Guildへようこそ！
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>名前</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="山田 太郎"
                placeholderTextColor={colors.business.subtext}
                style={styles.input}
                editable={!loading}
              />
            </View>

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
                placeholder="6文字以上"
                placeholderTextColor={colors.business.subtext}
                secureTextEntry
                style={styles.input}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>パスワード（確認）</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="パスワードを再入力"
                placeholderTextColor={colors.business.subtext}
                secureTextEntry
                style={styles.input}
                editable={!loading}
              />
            </View>

            <Pressable
              onPress={handleRegister}
              style={[
                styles.button,
                loading && styles.buttonDisabled
              ]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>アカウント作成</Text>
              )}
            </Pressable>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>既にアカウントをお持ちの方は</Text>
              <Link href="/auth/login" asChild>
                <Pressable disabled={loading}>
                  <Text style={styles.link}>ログイン</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.business.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
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