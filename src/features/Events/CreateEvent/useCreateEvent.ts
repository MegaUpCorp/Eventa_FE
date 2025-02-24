import { addHours } from 'date-fns'
import { useForm } from 'react-hook-form'

// TODO: Change this later after defining yup schema
export type FormValues = {
  calendarId: string
  visibility: string
  title: string
  startDate: string
  endDate: string
  isOnline: boolean
  location: {
    id: string
    name: string
    address: string
    lat: number
    lng: number
  }
  meetUrl: string
  description: string
  isFree: boolean
  requiresApproval: boolean
  capacity: string
  slug: string
  profilePicture: string
}

export const defaultLocationValues = {
  id: '',
  name: '',
  address: '',
  lat: 0,
  lng: 0
}

const defaultValues = {
  calendarId: 'pc',
  visibility: 'public',
  title: '',
  startDate: new Date().toISOString(),
  endDate: addHours(new Date(), 1).toISOString(),
  isOnline: false,
  location: defaultLocationValues,
  meetUrl: '',
  description: '',
  isFree: true,
  requiresApproval: false,
  capacity: '50',
  slug: '',
  profilePicture: ''
}

export const useCreateEvent = () => {
  const methods = useForm<FormValues>({
    defaultValues
  })

  return { methods }
}
