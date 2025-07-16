import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useGameStore } from '../stores/gameStore'

export const useAuth = () => {
  const authStore = useAuthStore()
  const gameStore = useGameStore()

  useEffect(() => {
    // Initialize auth when component mounts
    if (!authStore.initialized) {
      authStore.initialize()
    }
  }, [authStore.initialized])

  useEffect(() => {
    // Load game state from profile when user logs in
    if (authStore.profile && authStore.user) {
      gameStore.loadFromProfile()
    }
  }, [authStore.profile, authStore.user])

  return {
    // Auth state
    user: authStore.user,
    profile: authStore.profile,
    session: authStore.session,
    loading: authStore.loading,
    error: authStore.error,
    initialized: authStore.initialized,

    // Auth actions
    signIn: authStore.signIn,
    signUp: authStore.signUp,
    signOut: authStore.signOut,
    updateProfile: authStore.updateProfile,
    clearError: authStore.clearError,

    // Computed values
    isAuthenticated: !!authStore.session && !!authStore.user,
    hasProfile: !!authStore.profile,
  }
}