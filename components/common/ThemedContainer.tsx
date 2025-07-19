import { View, type ViewProps } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/stores/useThemeStore';
import { getThemeStyles } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemedContainerProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'card' | 'overlay';
  noStatusBar?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ThemedContainer({
  variant = 'primary',
  className,
  children,
  noStatusBar = false,
  ...props
}: ThemedContainerProps) {
  const { theme } = useThemeStore();
  const themeStyles = getThemeStyles(theme);

  return (
    <View
      className={cn(
        'flex-1',
        themeStyles.backgrounds[variant],
        className
      )}
      {...props}
    >
      {!noStatusBar && <StatusBar style={themeStyles.statusBar} />}
      {children}
    </View>
  );
}