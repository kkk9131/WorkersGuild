import { Text, type TextProps } from 'react-native';
import { useThemeStore } from '@/stores/useThemeStore';
import { getThemeStyles } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function ThemedText({
  variant = 'primary',
  size = 'base',
  weight = 'normal',
  className,
  children,
  ...props
}: ThemedTextProps) {
  const { theme } = useThemeStore();
  const themeStyles = getThemeStyles(theme);

  return (
    <Text
      className={cn(
        themeStyles.text[variant],
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}