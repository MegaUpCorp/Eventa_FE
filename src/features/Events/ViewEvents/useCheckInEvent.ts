import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from 'src/utils/http'

export const useCheckInEvent = (eventId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      eventId,
      uniqueCode,
      participantId
    }: {
      eventId: string
      uniqueCode: string
      participantId: string
    }) => {
      const { data } = await http.post('check-in/checkin', {
        eventId,
        uniqueCode,
        participantId
      })

      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['is-registered-for-event', eventId] })
    }
  })
}
