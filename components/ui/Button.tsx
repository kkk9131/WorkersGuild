import { Pressable, Text, type PressableProps } from 'react-native';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-game-primary',
  secondary: 'bg-business-secondary border border-business-border',
  outline: 'border border-game-primary',
  ghost: '',
};

const sizeStyles: Record<ButtonSize, { button: string; text: string }> = {
  sm: { button: 'py-2 px-4', text: 'text-sm' },
  md: { button: 'py-3 px-6', text: 'text-base' },
  lg: { button: 'py-4 px-8', text: 'text-lg' },
};

const textColorStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-business-text',
  outline: 'text-game-primary',
  ghost: 'text-business-text',
};

export const Button = forwardRef<any, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, disabled, isLoading, ...props }, ref) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const textColor = textColorStyles[variant];

    return (
      <Pressable
        ref={ref}
        className={`${variantStyle} ${sizeStyle.button} rounded-lg items-center justify-center active:opacity-80 ${
          disabled || isLoading ? 'opacity-50' : ''
        } ${className || ''}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text className={`${textColor} font-semibold ${sizeStyle.text}`}>
            {isLoading ? '読み込み中...' : children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';