import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from './authStore'

interface GameState {
    // Level and Experience
    level: number
    experience: number
    experienceToNext: number

    // Skills (1-100)
    skills: {
        strength: number
        agility: number
        intelligence: number
        endurance: number
        charisma: number
    }

    // Evolution stages (1-4)
    evolutionStage: number

    // Statistics
    stats: {
        tasksCompleted: number
        totalExpEarned: number
        streakDays: number
        lastActiveDate: string | null
    }

    // Theme preference
    theme: 'game' | 'business'
}

interface GameActions {
    // Experience and Leveling
    awardExperience: (amount: number) => Promise<void>
    levelUp: () => Promise<void>
    calculateExperienceToNext: (level: number) => number

    // Skills
    increaseSkill: (skill: keyof GameState['skills'], amount: number) => Promise<void>

    // Evolution
    checkEvolution: () => Promise<void>
    evolve: () => Promise<void>

    // Statistics
    incrementTasksCompleted: () => void
    updateStreak: () => void

    // Theme
    toggleTheme: () => void

    // Sync with backend
    syncWithProfile: () => Promise<void>
    loadFromProfile: () => Promise<void>
}

export const useGameStore = create<GameState & GameActions>()(
    persist(
        (set, get) => ({
            // Initial state
            level: 1,
            experience: 0,
            experienceToNext: 100,
            skills: {
                strength: 1,
                agility: 1,
                intelligence: 1,
                endurance: 1,
                charisma: 1,
            },
            evolutionStage: 1,
            stats: {
                tasksCompleted: 0,
                totalExpEarned: 0,
                streakDays: 0,
                lastActiveDate: null,
            },
            theme: 'game',

            // Experience calculation (exponential growth)
            calculateExperienceToNext: (level: number) => {
                return Math.floor(100 * Math.pow(1.2, level - 1))
            },

            awardExperience: async (amount: number) => {
                const state = get()
                const newExp = state.experience + amount
                const expToNext = state.calculateExperienceToNext(state.level)

                set(prevState => ({
                    experience: newExp,
                    stats: {
                        ...prevState.stats,
                        totalExpEarned: prevState.stats.totalExpEarned + amount,
                    }
                }))

                // Check for level up
                if (newExp >= expToNext) {
                    await get().levelUp()
                }

                // Sync with backend
                await get().syncWithProfile()
            },

            levelUp: async () => {
                const state = get()
                const newLevel = state.level + 1
                const expToNext = state.calculateExperienceToNext(newLevel)
                const remainingExp = state.experience - state.experienceToNext

                set({
                    level: newLevel,
                    experience: remainingExp,
                    experienceToNext: expToNext,
                })

                // Award skill points on level up
                const skillIncrease = Math.floor(newLevel / 5) + 1
                const randomSkill = ['strength', 'agility', 'intelligence', 'endurance', 'charisma'][
                    Math.floor(Math.random() * 5)
                ] as keyof GameState['skills']

                await get().increaseSkill(randomSkill, skillIncrease)

                // Check for evolution
                await get().checkEvolution()

                console.log(`Level up! Now level ${newLevel}. ${randomSkill} increased by ${skillIncrease}`)
            },

            increaseSkill: async (skill: keyof GameState['skills'], amount: number) => {
                set(state => ({
                    skills: {
                        ...state.skills,
                        [skill]: Math.min(100, state.skills[skill] + amount),
                    }
                }))

                await get().syncWithProfile()
            },

            checkEvolution: async () => {
                const state = get()
                const { level, evolutionStage } = state

                // Evolution thresholds: 1, 25, 50, 75
                const evolutionLevels = [1, 25, 50, 75]
                const newStage = evolutionLevels.findIndex(threshold => level < threshold) || 4

                if (newStage > evolutionStage) {
                    await get().evolve()
                }
            },

            evolve: async () => {
                const state = get()
                const newStage = Math.min(4, state.evolutionStage + 1)

                set({ evolutionStage: newStage })

                // Award bonus stats on evolution
                const bonusAmount = newStage * 2
                Object.keys(state.skills).forEach(skill => {
                    get().increaseSkill(skill as keyof GameState['skills'], bonusAmount)
                })

                console.log(`Evolution! Now stage ${newStage}. All skills increased by ${bonusAmount}`)

                await get().syncWithProfile()
            },

            incrementTasksCompleted: () => {
                set(state => ({
                    stats: {
                        ...state.stats,
                        tasksCompleted: state.stats.tasksCompleted + 1,
                    }
                }))

                get().updateStreak()
            },

            updateStreak: () => {
                const today = new Date().toDateString()
                const state = get()

                if (state.stats.lastActiveDate !== today) {
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)

                    const isConsecutive = state.stats.lastActiveDate === yesterday.toDateString()

                    set(prevState => ({
                        stats: {
                            ...prevState.stats,
                            streakDays: isConsecutive ? prevState.stats.streakDays + 1 : 1,
                            lastActiveDate: today,
                        }
                    }))
                }
            },

            toggleTheme: () => {
                set(state => ({
                    theme: state.theme === 'game' ? 'business' : 'game'
                }))
            },

            syncWithProfile: async () => {
                try {
                    const authStore = useAuthStore.getState()
                    if (!authStore.user) return

                    const state = get()

                    await authStore.updateProfile({
                        level: state.level,
                        experience: state.experience,
                        evolution_stage: state.evolutionStage,
                        strength: state.skills.strength,
                        agility: state.skills.agility,
                        intelligence: state.skills.intelligence,
                        endurance: state.skills.endurance,
                        charisma: state.skills.charisma,
                    })
                } catch (error) {
                    console.error('Failed to sync game state with profile:', error)
                }
            },

            loadFromProfile: async () => {
                try {
                    const authStore = useAuthStore.getState()
                    const profile = authStore.profile

                    if (profile) {
                        set({
                            level: profile.level,
                            experience: profile.experience,
                            experienceToNext: get().calculateExperienceToNext(profile.level),
                            evolutionStage: profile.evolution_stage,
                            skills: {
                                strength: profile.strength,
                                agility: profile.agility,
                                intelligence: profile.intelligence,
                                endurance: profile.endurance,
                                charisma: profile.charisma,
                            }
                        })
                    }
                } catch (error) {
                    console.error('Failed to load game state from profile:', error)
                }
            },
        }),
        {
            name: 'game-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                theme: state.theme,
                stats: state.stats,
            }),
        }
    )
)