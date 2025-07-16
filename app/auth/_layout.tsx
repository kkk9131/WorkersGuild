import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1F2937',
        },
        headerTintColor: '#F9FAFB',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'ログイン',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: '新規登録',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}