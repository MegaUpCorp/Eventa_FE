import { create } from 'zustand'

type State = 'sign-in' | 'sign-up' | 'check-email' | 'forgot-password' | 'reset-password'

interface AuthStoreState {
  isOpenDialog: boolean
  setIsOpenDialog: (isOpenDialog: boolean) => void
  state: State
  setState: (state: State) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  state: 'sign-in',
  setState: (state) => set({ state }),
  isOpenDialog: false,
  setIsOpenDialog: (isOpenDialog) => set({ isOpenDialog })
}))
