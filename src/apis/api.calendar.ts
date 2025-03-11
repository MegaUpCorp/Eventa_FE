import http from 'src/utils/http'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { Calendar, CalendarDetail } from 'src/@types/calendar.type'

const calendarAPI = {
  createCalendar: (data: CreateCalendarSchema) => http.post('accounts/calendar', data),
  getMyCalendars: () => http.get<Calendar[]>('accounts/calendars/accountId'),
  getMySubscribedCalendars: () => http.get<Calendar[]>('accounts/subscribed-calendars'),
  getCalendarDetail: async (publicUrl: string) => {
    const { data } = await http.get<CalendarDetail>(`accounts/calendar/${publicUrl}`)
    return data
  },
  subscribeCalendar: (publicUrl: string) => http.post(`accounts/subscribe?publicUrl=${publicUrl}`)
}

export default calendarAPI
