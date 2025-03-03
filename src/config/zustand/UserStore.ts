import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { DecodedUserToken } from 'src/@types/users.type'

interface UserStoreState {
  isAuthenticated: boolean
  token: string
  user: DecodedUserToken | null
  login: (accessToken: string) => void
  logout: () => void
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: '',
      user: null,
      login: (accessToken) => {
        set({ isAuthenticated: true, token: accessToken })
        set({ user: jwtDecode(accessToken) as DecodedUserToken })
      },
      logout: () => {
        localStorage.clear()
        return set({ isAuthenticated: false, token: '', user: null })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true
          state.user = jwtDecode(state.token) as DecodedUserToken
        }
      }
    }
  )
)
