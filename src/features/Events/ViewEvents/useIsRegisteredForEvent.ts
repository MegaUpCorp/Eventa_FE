import http from 'src/utils/http'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const useIsRegisteredForEvent = (eventId: string) => {
  const { slug } = useParams()

  return useQuery({
    queryKey: ['is-registered-for-event', eventId],
    queryFn: async () => {
      const { data } = await http.get<{
        code: string
        isCheckin: boolean
        isRegistered: boolean
        paticipantId: string
      }>(`/participants/checkaccount-register-event?slug=${slug}`)
      return data
    }
  })
}
