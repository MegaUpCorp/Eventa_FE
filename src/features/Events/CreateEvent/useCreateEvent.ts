import { useForm } from 'react-hook-form'

// TODO: Change this later after defining yup schema
export type FormValues = {
  eventCalendar: string
  eventVisibility: string
  eventName: string
  eventLocation: string
  eventTicketType: string
  eventApprovalRequired: boolean
  eventCapacity: string
  eventTheme: string
  eventCover: string
  eventDescription: string
}

export const useCreateEvent = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      eventCalendar: 'pc',
      eventVisibility: 'public',
      eventName: '',
      eventLocation: '',
      eventTicketType: 'free',
      eventApprovalRequired: false,
      eventCapacity: '50',
      eventTheme: 'default',
      eventCover: '',
      eventDescription: ''
    }
  })

  return { methods }
}
