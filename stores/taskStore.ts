import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { Database } from '../types/database'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

interface TaskState {
    tasks: Task[]
    loading: boolean
    error: string | null
    filter: {
        status?: Task['status']
        priority?: Task['priority']
        rarity?: Task['rarity']
        assignedToMe?: boolean
    }
}

interface TaskActions {
    fetchTasks: () => Promise<void>
    createTask: (task: TaskInsert) => Promise<void>
    updateTask: (id: string, updates: TaskUpdate) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    completeTask: (id: string) => Promise<void>
    setFilter: (filter: Partial<TaskState['filter']>) => void
    clearFilter: () => void
    clearError: () => void
}

export const useTaskStore = create<TaskState & TaskActions>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    filter: {},

    fetchTasks: async () => {
        try {
            set({ loading: true, error: null })

            let query = supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false })

            const { filter } = get()

            if (filter.status) {
                query = query.eq('status', filter.status)
            }

            if (filter.priority) {
                query = query.eq('priority', filter.priority)
            }

            if (filter.rarity) {
                query = query.eq('rarity', filter.rarity)
            }

            if (filter.assignedToMe) {
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    query = query.eq('assigned_to', user.id)
                }
            }

            const { data, error } = await query

            if (error) throw error

            set({ tasks: data || [] })
        } catch (error: any) {
            console.error('Fetch tasks error:', error)
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    createTask: async (task: TaskInsert) => {
        try {
            set({ loading: true, error: null })
            const { data: { user } } = await supabase.auth.getUser()

            const { data, error } = await supabase
                .from('tasks')
                .insert({
                    ...task,
                    created_by: user?.id,
                })
                .select()
                .single()

            if (error) throw error

            // Add to local state
            set(state => ({
                tasks: [data, ...state.tasks]
            }))
        } catch (error: any) {
            console.error('Create task error:', error)
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    updateTask: async (id: string, updates: TaskUpdate) => {
        try {
            set({ loading: true, error: null })

            const { data, error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            // Update local state
            set(state => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? data : task
                )
            }))
        } catch (error: any) {
            console.error('Update task error:', error)
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    deleteTask: async (id: string) => {
        try {
            set({ loading: true, error: null })

            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)

            if (error) throw error

            // Remove from local state
            set(state => ({
                tasks: state.tasks.filter(task => task.id !== id)
            }))
        } catch (error: any) {
            console.error('Delete task error:', error)
            set({ error: error.message })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    completeTask: async (id: string) => {
        try {
            const task = get().tasks.find(t => t.id === id)
            if (!task) return

            await get().updateTask(id, {
                status: 'done',
                completed_at: new Date().toISOString(),
            })

            // Award EXP to user (this would trigger level up logic)
            if (task.exp_reward) {
                console.log(`Awarded ${task.exp_reward} EXP for completing task: ${task.title}`)
                // TODO: Implement EXP award logic in user profile
            }
        } catch (error: any) {
            console.error('Complete task error:', error)
            set({ error: error.message })
            throw error
        }
    },

    setFilter: (filter: Partial<TaskState['filter']>) => {
        set(state => ({
            filter: { ...state.filter, ...filter }
        }))
    },

    clearFilter: () => {
        set({ filter: {} })
    },

    clearError: () => set({ error: null }),
}))