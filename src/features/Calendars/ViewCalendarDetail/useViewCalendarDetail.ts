import calendarAPI from 'src/apis/api.calendar'
import { useQueries } from '@tanstack/react-query'
import { useUserStore } from 'src/config/zustand/UserStore'

export const useViewCalendarDetail = (publicUrl: string, title?: string, startDate?: string) => {
  const { user } = useUserStore()

  return useQueries({
    queries: [
      {
        queryKey: ['calendarDetail', publicUrl, user?.id],
        queryFn: () => calendarAPI.getCalendarDetail(publicUrl || '')
      },
      {
        queryKey: ['calendarEvents', publicUrl, title, startDate],
        queryFn: () => calendarAPI.getCalendarEvents(publicUrl, title, startDate)
      }
    ]
  })
}
