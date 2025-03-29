import { useQuery } from '@tanstack/react-query'
import eventAPI from 'src/apis/api.event'

export const useViewEventDetail = (publicUrl: string) => {
  return useQuery({
    queryKey: ['event', publicUrl],
    queryFn: () => eventAPI.getEventDetail(publicUrl)
  })
}
