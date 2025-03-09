import http from 'src/utils/http'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { Calendar } from 'src/@types/calendar.type'

const calendarAPI = {
  createCalendar: (data: CreateCalendarSchema) => http.post('accounts/calendar', data),
  getMyCalendars: () => http.get<Calendar[]>('accounts/calendars/accountId'),
  getMySubscribedCalendars: () => http.get<Calendar[]>('accounts/subscribed-calendars')
}

export default calendarAPI
