import eventAPI from 'src/apis/api.event'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const useViewEventGuests = () => {
  const { slug } = useParams()

  return useQuery({
    queryKey: ['getEventGuestsList'],
    queryFn: () => eventAPI.getEventGuestsList(slug || '')
  })
}
