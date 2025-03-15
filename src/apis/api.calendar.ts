import http from 'src/utils/http'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { Calendar, CalendarDetail, CalendarEvent } from 'src/@types/calendar.type'
import { ItemBaseResponse } from 'src/@types/response'

const calendarAPI = {
  createCalendar: (data: CreateCalendarSchema) => http.post('accounts/calendar', data),
  getMyCalendars: () => http.get<Calendar[]>('accounts/calendars/accountId'),
  getMySubscribedCalendars: () => http.get<Calendar[]>('accounts/subscribed-calendars'),
  getCalendarDetail: async (publicUrl: string) => {
    const { data } = await http.get<CalendarDetail>(`accounts/calendar/${publicUrl}`)
    return data
  },
  subscribeCalendar: (publicUrl: string) => http.post(`accounts/subscribe?publicUrl=${publicUrl}`),
  unsubscribeCalendar: (publicUrl: string) =>
    http.post(`accounts/unsubscribe-calendar`, {
      publicUrl
    }),
  getCalendarEvents: async (publicUrl: string, title?: string, startDate?: string) => {
    let url = `events/filter?publicUrl=${publicUrl}`
    if (title) url += `&title=${title}`
    if (startDate) url += `&startDate=${startDate}`

    const { data } = await http.get<ItemBaseResponse<CalendarEvent[]>>(url)
    return data
  }
}

export default calendarAPI
