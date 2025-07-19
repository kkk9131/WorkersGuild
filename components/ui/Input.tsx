import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { forwardRef } from 'react';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <View className="w-full">
        {label && (
          <Text className="text-business-text mb-2 font-medium">{label}</Text>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor="#6B7280"
          className={`bg-business-secondary border ${error ? 'border-red-500' : 'border-business-border'
            } rounded-lg px-4 py-3 text-business-text ${className || ''}`}
          {...props}
        />
        {error && (
          <Text className="text-red-500 text-sm mt-1">{error}</Text>
        )}
        {helperText && !error && (
          <Text className="text-business-subtext text-sm mt-1">{helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';