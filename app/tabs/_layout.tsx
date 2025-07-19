import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { colors } from '@/lib/styles';
import { useThemeStore } from '@/stores/useThemeStore';

// アイコンコンポーネント（絵文字を使用）
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const { theme } = useThemeStore();
  const isGameTheme = theme === 'game';
  
  const iconMap: { [key: string]: string } = {
    home: '🏠',
    tasks: '📋',
    profile: '👤',
    team: '👥',
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ 
        fontSize: 24,
        opacity: focused ? 1 : 0.6,
        transform: [{ scale: focused ? 1.1 : 1 }]
      }}>
        {iconMap[name]}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const { theme } = useThemeStore();
  const isGameTheme = theme === 'game';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary,
          borderTopWidth: 1,
          borderTopColor: isGameTheme ? colors.game.secondary : colors.business.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: isGameTheme ? colors.game.gold : colors.game.primary,
        tabBarInactiveTintColor: colors.business.subtext,
        headerStyle: {
          backgroundColor: isGameTheme ? colors.game.primary : colors.business.primary,
        },
        headerTintColor: colors.business.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'タスク',
          tabBarIcon: ({ focused }) => <TabIcon name="tasks" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'チーム',
          tabBarIcon: ({ focused }) => <TabIcon name="team" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'プロフィール',
          tabBarIcon: ({ focused }) => <TabIcon name="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}