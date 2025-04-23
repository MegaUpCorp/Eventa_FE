import http from 'src/utils/http'
import { CreateEventSchema } from 'src/schemas/eventSchema'

const eventAPI = {
  createEvent: (data: CreateEventSchema) => http.post('events/create', data),
  getEvents: () => http.get('events/get-all'),
  getEventDetail: (slug: string) => http.get(`events/getEvent/slug?slug=${slug}`),
  getMyEvents: () => http.get('events/get-all-me'),
  getEventGuestsList: async (slug: string) => {
    const { data } = await http.get<
      {
        id: string
        profilePicture: string
        fullName: string
        email: string
        isCheckin: boolean
        participantId: string
      }[]
    >(`participants/get-all-participant-of-event?slug=${slug}`)
    return data
  }
}

export default eventAPI
