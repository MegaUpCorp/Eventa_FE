import http from 'src/utils/http'
import { CreateEventSchema } from 'src/schemas/eventSchema'

const eventAPI = {
  createEvent: (data: CreateEventSchema) => http.post('events/create', data),
  getEvents: () => http.get('events/get-all'),
  getEventDetail: (slug: string) => http.get(`events/getEvent/slug?slug=${slug}`),
  getMyEvents: () => http.get('events/get-all-me'),
}

export default eventAPI
