import { useForm } from 'react-hook-form'

export interface CreateCalendarFormValues {
  calendarName: string
  calendarDescription: string
  calendarColor: string
  calendarPublicUrl: string
  calendarLocation: string
  calendarProfile: string
  calendarCover: string
}

export const useCreateCalendar = () => {
  const methods = useForm<CreateCalendarFormValues>({
    defaultValues: {
      calendarName: '',
      calendarDescription: '',
      calendarColor: '',
      calendarPublicUrl: '',
      calendarLocation: '',
      calendarProfile: '',
      calendarCover: ''
    }
  })

  return { methods }
}
