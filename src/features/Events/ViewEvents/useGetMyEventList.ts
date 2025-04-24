import { useQuery } from '@tanstack/react-query'
import eventAPI from 'src/apis/api.event'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useGetMyEventList = () => {
  const { user } = useUserStore()

  return useQuery({
    queryKey: ['myEvents', user?.id],
    queryFn: eventAPI.getMyEvents
  })
}
