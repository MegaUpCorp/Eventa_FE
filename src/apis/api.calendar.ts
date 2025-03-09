import http from 'src/utils/http'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'

const calendarAPI = {
  createCalendar: (data: CreateCalendarSchema) => http.post('accounts/calendar', data),
  getMyCalendars: () => http.get<{ id: string; name: string; profilePicture: string }[]>('accounts/calendars/accountId')
}

export default calendarAPI
