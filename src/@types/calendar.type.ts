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
  accountId: string
}

export interface CalendarEventItem {
  calendarId: string
  capacity: number
  createdAt: string
  description: string
  endDate: string
  id: string
  isFree: boolean
  isOnline: boolean
  location: {
    id: string
    name: string
    address: string
    latitude: number
    longitude: number
  }
  meetUrl: string
  price: number
  profilePicture: string
  requiresApproval: boolean
  slug: string
  startDate: string
  title: string
  visibility: string
}

export interface CalendarEventAccount {
  id: string
  username: string
  profilePicture: string
}

export interface CalendarEvent {
  startDate: string
  account: CalendarEventAccount[]
  events: CalendarEventItem[]
}
