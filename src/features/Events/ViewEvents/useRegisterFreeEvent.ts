import { useMutation } from '@tanstack/react-query'
import http from 'src/utils/http'

export const useRegisterFreeEvent = (eventId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post('participants/registerPaticipant', {
        eventId
      })
      return data
    }
  })
}
