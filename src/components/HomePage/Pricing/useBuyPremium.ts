import http from 'src/utils/http'
import { useMutation } from '@tanstack/react-query'

export const useBuyPremium = (plant: 'month' | 'year') => {
  const eventId = plant === 'month' ? 'adfa885a-7116-4a85-a4c8-fb1af5ad9d58' : '42c03ce8-2dbd-40b4-8bed-3ddb386fcdf8'

  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post('SepayAuth/generate-qr', {
        eventId
      })
      return data
    }
  })
}
