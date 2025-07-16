import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Supabase認証実装
    console.log('Login:', { email, password });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-business-primary"
    >
      <View className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-business-text mb-2">
            お帰りなさい！
          </Text>
          <Text className="text-business-subtext">
            アカウントにログインして続けましょう
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-business-text mb-2">メールアドレス</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-business-secondary border border-business-border rounded-lg px-4 py-3 text-business-text"
            />
          </View>

          <View>
            <Text className="text-business-text mb-2">パスワード</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              secureTextEntry
              className="bg-business-secondary border border-business-border rounded-lg px-4 py-3 text-business-text"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            className="bg-game-primary py-4 rounded-lg items-center mt-6 active:opacity-80"
          >
            <Text className="text-white font-semibold text-lg">ログイン</Text>
          </Pressable>

          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-business-subtext">アカウントをお持ちでない方は</Text>
            <Link href="/auth/register" asChild>
              <Pressable>
                <Text className="text-game-primary font-semibold ml-1">新規登録</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}