import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'game' | 'business';

const THEME_KEY = '@workers-guild/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('business');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme === 'game' || savedTheme === 'business') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'game' ? 'business' : 'game';
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const saveTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return {
    theme,
    isLoading,
    toggleTheme,
    saveTheme,
    isGameTheme: theme === 'game',
    isBusinessTheme: theme === 'business',
  };
}