import http from 'src/utils/http'
import { ItemBaseResponse, ListBaseResponse } from 'src/@types/response'

const organizerAPI = {
  getOrganizer: (slug: string) => http.get(`organizer/get-organizer?slug=${slug}`),
  getOrganizerEvents: (slug: string) => http.get(`events/get-all-organizer?slug=${slug}`),
  getOrganizerEventsById: (id: string) => http.get(`organizers/get-organizer/${id}`),
}

export default organizerAPI