import eventAPI from 'src/apis/api.event'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { addHours } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useGetMyCalendars } from 'src/features/Calendars/ViewCalendars/useGetMyCalendars'
import { useLocalStorage } from 'src/hooks/useLocalStorage'
import { createEventSchema, CreateEventSchema, defaultLocationValues } from 'src/schemas/eventSchema'

export const defaultValues: Partial<CreateEventSchema> = {
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
  profilePicture: '',
  bankAcc: {
    acc: 'none',
    bank: 'none',
    amount: 0,
    des: 'none'
  }
}

export const useCreateEvent = () => {
  const [description] = useLocalStorage('event-desc', '')
  const { data: myCalendars } = useGetMyCalendars()
  const methods = useForm<CreateEventSchema>({
    defaultValues: {
      ...defaultValues,
      description
    },
    resolver: yupResolver(createEventSchema)
  })

  const createEventMutation = useMutation({
    mutationFn: eventAPI.createEvent
  })

  return { methods, createEventMutation, myCalendars }
}
