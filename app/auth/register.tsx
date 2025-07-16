import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // TODO: Supabase認証実装
    console.log('Register:', { name, email, password });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-business-primary"
    >
      <ScrollView className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-business-text mb-2">
            新規登録
          </Text>
          <Text className="text-business-subtext">
            Workers Guildへようこそ！
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-business-text mb-2">名前</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="山田 太郎"
              placeholderTextColor="#6B7280"
              className="bg-business-secondary border border-business-border rounded-lg px-4 py-3 text-business-text"
            />
          </View>

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
              placeholder="8文字以上"
              placeholderTextColor="#6B7280"
              secureTextEntry
              className="bg-business-secondary border border-business-border rounded-lg px-4 py-3 text-business-text"
            />
          </View>

          <View>
            <Text className="text-business-text mb-2">パスワード（確認）</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="パスワードを再入力"
              placeholderTextColor="#6B7280"
              secureTextEntry
              className="bg-business-secondary border border-business-border rounded-lg px-4 py-3 text-business-text"
            />
          </View>

          <Pressable
            onPress={handleRegister}
            className="bg-game-primary py-4 rounded-lg items-center mt-6 active:opacity-80"
          >
            <Text className="text-white font-semibold text-lg">アカウント作成</Text>
          </Pressable>

          <View className="flex-row items-center justify-center mt-4 mb-8">
            <Text className="text-business-subtext">既にアカウントをお持ちの方は</Text>
            <Link href="/auth/login" asChild>
              <Pressable>
                <Text className="text-game-primary font-semibold ml-1">ログイン</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}