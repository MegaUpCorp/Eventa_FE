import http from 'src/utils/http'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useCheckPremium = () => {
  const { user } = useUserStore()

  return useQuery({
    queryKey: ['checkPremium', user?.id],
    queryFn: async () => {
      const { data } = await http.get('SepayAuth/check-premium')
      return data?.isPremium
    }
  })
}
