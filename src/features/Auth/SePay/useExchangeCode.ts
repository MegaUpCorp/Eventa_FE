import authAPI from 'src/apis/api.auth'
import { useQuery } from '@tanstack/react-query'

export const useExchangeCode = (code: string | null, enabled: boolean) => {
  return useQuery({
    queryKey: ['exchangeCode', code],
    queryFn: () => authAPI.exchangeCode({ code: code! }),
    enabled
  })
}
