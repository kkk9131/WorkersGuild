import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

// TODO: Supabase認証に置き換え
interface User {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'leader' | 'member';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // TODO: Supabaseセッションチェック
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // TODO: Supabaseセッション取得
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Supabaseログイン実装
      console.log('Sign in:', { email, password });
      
      // 仮のユーザーデータ
      const mockUser: User = {
        id: '1',
        email,
        name: 'テストユーザー',
        role: 'individual',
      };
      
      setUser(mockUser);
      router.replace('/tabs');
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // TODO: Supabase登録実装
      console.log('Sign up:', { email, password, name });
      
      // 仮のユーザーデータ
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'individual',
      };
      
      setUser(mockUser);
      router.replace('/tabs');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Supabaseログアウト実装
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
}