import http from 'src/utils/http'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'

const calendarAPI = {
  createCalendar: (data: CreateCalendarSchema) => http.post('accounts/calendar', data)
}

export default calendarAPI
