import calendarAPI from 'src/apis/api.calendar'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useViewCalendarDetail = () => {
  const { publicUrl } = useParams()
  const { user } = useUserStore()

  return useQueries({
    queries: [
      {
        queryKey: ['calendarDetail', publicUrl, user?.id],
        queryFn: () => calendarAPI.getCalendarDetail(publicUrl || '')
      }
    ]
  })
}
