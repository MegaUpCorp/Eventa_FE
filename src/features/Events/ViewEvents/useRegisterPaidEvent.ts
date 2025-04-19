import http from 'src/utils/http'
import { useMutation } from '@tanstack/react-query'

export const useRegisterPaidEvent = (eventId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post('SepayAuth/generate-qr', {
        eventId
      })
      return data
    }
  })
}
