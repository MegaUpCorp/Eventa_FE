import eventAPI from 'src/apis/api.event'
import { useMutation } from '@tanstack/react-query'
import { addHours } from 'date-fns'
import { useForm } from 'react-hook-form'
import { createEventSchema, CreateEventSchema, defaultLocationValues } from 'src/schemas/eventSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

const defaultValues: Partial<CreateEventSchema> = {
  calendarId: 'pc',
  visibility: 'public',
  title: '',
  startDate: new Date().toISOString(),
  endDate: addHours(new Date(), 1).toISOString(),
  isOnline: false,
  location: defaultLocationValues,
  meetUrl: '',
  isFree: true,
  type: 'free',
  price: 0,
  requiresApproval: false,
  capacity: '50',
  slug: '',
  profilePicture: ''
}

export const useCreateEvent = () => {
  const [description] = useLocalStorage('event-desc', '')
  const methods = useForm<CreateEventSchema>({
    defaultValues: {
      ...defaultValues,
      description
    },
    resolver: yupResolver(createEventSchema)
  })

  const createEventMutation = useMutation({
    mutationFn: eventAPI.createEvent,
    onSuccess: () => {
      // TODO: Redirect to the event page management
      methods.reset()
      localStorage.removeItem('event-desc')
    },
    onError: () => {
      // TODO: Handle error
    }
  })

  return { methods, createEventMutation }
}
