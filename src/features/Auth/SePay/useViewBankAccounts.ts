import sepayAPI from 'src/apis/api.sepay'
import { useQuery } from '@tanstack/react-query'

export const useViewBankAccounts = () => {
  return useQuery({
    queryKey: ['bank-accounts'],
    queryFn: sepayAPI.getBankAccounts,
    enabled: Boolean(localStorage.getItem('sepay-access-token'))
  })
}
