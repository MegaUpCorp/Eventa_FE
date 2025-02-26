import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserStoreState {
  isAuthenticated: boolean
  token: string
  login: (accessToken: string) => void
  logout: () => void
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: '',
      login: (accessToken) => set({ isAuthenticated: true, token: accessToken }),
      logout: () => {
        localStorage.clear()
        return set({ isAuthenticated: false, token: '' })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state && state.token) {
          state.isAuthenticated = true
        }
      }
    }
  )
)
