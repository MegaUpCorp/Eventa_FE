import http from 'src/utils/http'
import { CreateEventSchema } from 'src/schemas/eventSchema'

const eventAPI = {
  createEvent: (data: CreateEventSchema) => http.post('events/create', data)
}

export default eventAPI
