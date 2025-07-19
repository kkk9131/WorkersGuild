import { Pressable, Text, type PressableProps } from 'react-native';
import { useThemeStore } from '@/stores/useThemeStore';
import { getThemeStyles, animations } from '@/lib/themes';
import { cn } from '@/lib/utils';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ThemedButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { button: 'py-2 px-4', text: 'text-sm' },
  md: { button: 'py-3 px-6', text: 'text-base' },
  lg: { button: 'py-4 px-8', text: 'text-lg' },
};

export function ThemedButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  isLoading,
  animate = true,
  onPressIn,
  onPressOut,
  ...props
}: ThemedButtonProps) {
  const { theme } = useThemeStore();
  const themeStyles = getThemeStyles(theme);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (event: any) => {
    if (animate && theme === 'game') {
      scale.value = withSpring(0.95);
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    if (animate && theme === 'game') {
      scale.value = withSpring(1);
    }
    onPressOut?.(event);
  };

  return (
    <AnimatedPressable
      className={cn(
        themeStyles.buttons[variant],
        sizeStyles[size].button,
        'rounded-lg items-center justify-center',
        theme === 'game' && animate && animations.game.float,
        (disabled || isLoading) && 'opacity-50',
        className
      )}
      style={animatedStyle}
      disabled={disabled || isLoading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={`text-white font-semibold ${sizeStyles[size].text}`}>
          {isLoading ? '読み込み中...' : children}
        </Text>
      ) : (
        children
      )}
    </AnimatedPressable>
  );
}