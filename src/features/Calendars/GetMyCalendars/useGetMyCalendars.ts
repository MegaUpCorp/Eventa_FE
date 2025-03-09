import calendarAPI from 'src/apis/api.calendar'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useGetMyCalendars = () => {
  const { user } = useUserStore()

  return useQuery({
    queryKey: ['getMyCalendars', user?.id],
    queryFn: calendarAPI.getMyCalendars
  })
}
