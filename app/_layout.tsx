import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    // 後でここに初期設定を追加
  }, []);

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
        name="index" 
        options={{ 
          title: 'Workers Guild',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="demo" 
        options={{ 
          title: 'テーマデモ',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}