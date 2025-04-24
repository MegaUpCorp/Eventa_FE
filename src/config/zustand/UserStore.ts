import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { DecodedUserToken } from 'src/@types/users.type'
import { redirect } from 'react-router-dom'

interface UserStoreState {
  isAuthenticated: boolean
  isSepayAuthenticated: boolean
  token: string
  sePayAccessToken: string
  sePayRefreshToken: string
  user: DecodedUserToken | null
  login: (accessToken: string) => void
  sePayLogin: (accessToken: string, refreshToken: string) => void
  sePayLogout: () => void
  logout: () => void
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isSepayAuthenticated: false,
      token: '',
      sePayAccessToken: '',
      sePayRefreshToken: '',
      user: null,
      login: (accessToken) => {
        set({ isAuthenticated: true, token: accessToken })
        set({ user: jwtDecode(accessToken) as DecodedUserToken })
      },
      sePayLogin: (accessToken, refreshToken) => {
        set({
          isSepayAuthenticated: true,
          sePayAccessToken: accessToken,
          sePayRefreshToken: refreshToken
        })
      },
      sePayLogout: () => {
        set({
          isSepayAuthenticated: false,
          sePayAccessToken: '',
          sePayRefreshToken: ''
        })
      },
      logout: () => {
        localStorage.clear()
        return set({
          isAuthenticated: false,
          isSepayAuthenticated: false,
          token: '',
          sePayAccessToken: '',
          sePayRefreshToken: '',
          user: null
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        sePayAccessToken: state.sePayAccessToken,
        sePayRefreshToken: state.sePayRefreshToken
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true
          state.user = jwtDecode(state.token) as DecodedUserToken
        }

        if (state?.sePayAccessToken && state?.sePayRefreshToken) {
          state.isSepayAuthenticated = true
        }
      }
    }
  )
)
