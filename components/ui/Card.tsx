import { View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'bordered';
  children: ReactNode;
}

const variantStyles = {
  default: 'bg-business-secondary',
  elevated: 'bg-business-secondary shadow-lg',
  bordered: 'bg-business-primary border border-business-border',
};

export function Card({ variant = 'default', children, className, ...props }: CardProps) {
  return (
    <View
      className={`rounded-lg p-4 ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}