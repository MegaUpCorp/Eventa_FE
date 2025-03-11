export interface Calendar {
  id: string
  name: string
  profilePicture: string
  subscribers: number
  publicUrl: string
}

export interface CalendarDetail extends Calendar {
  color: string
  coverPicture: string
  description: string
  location: {
    id: string
    name: string
    address: string
    latitude: number
    longitude: number
  }
  isSubscribe: boolean
}
