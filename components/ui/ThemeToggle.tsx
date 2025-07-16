import { Pressable, Text, View } from 'react-native';
import { useThemeStore } from '@/stores/useThemeStore';
import { getThemeStyles } from '@/lib/themes';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const themeStyles = getThemeStyles(theme);
  const slideAnimation = useSharedValue(theme === 'business' ? 0 : 1);

  useEffect(() => {
    slideAnimation.value = withSpring(theme === 'business' ? 0 : 1);
  }, [theme]);

  const sliderStyle = useAnimatedStyle(() => {
    const translateX = interpolate(slideAnimation.value, [0, 1], [2, 32]);
    return {
      transform: [{ translateX }],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'business' ? '#374151' : '#8B5CF6',
    };
  });

  return (
    <View className="items-center">
      <AnimatedPressable
        onPress={toggleTheme}
        className="w-16 h-8 rounded-full p-1 relative"
        style={backgroundStyle}
      >
        <Animated.View
          className="w-6 h-6 bg-white rounded-full shadow-lg"
          style={sliderStyle}
        />
      </AnimatedPressable>
      
      <Text className={`mt-2 text-sm ${themeStyles.text.secondary}`}>
        {theme === 'business' ? 'ビジネス' : 'ゲーム'}モード
      </Text>
    </View>
  );
}