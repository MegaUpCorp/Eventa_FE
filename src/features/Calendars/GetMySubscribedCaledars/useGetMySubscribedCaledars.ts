import calendarAPI from 'src/apis/api.calendar'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useGetMySubscribedCaledars = () => {
  const { user } = useUserStore()

  return useQuery({
    queryKey: ['getMySubscribedCalendars', user?.id],
    queryFn: calendarAPI.getMySubscribedCalendars
  })
}
