import sepayAPI from 'src/apis/api.sepay'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useViewBankAccounts = () => {
  const { isSepayAuthenticated } = useUserStore()

  return useQuery({
    queryKey: ['bank-accounts'],
    queryFn: sepayAPI.getBankAccounts,
    enabled: isSepayAuthenticated
  })
}
