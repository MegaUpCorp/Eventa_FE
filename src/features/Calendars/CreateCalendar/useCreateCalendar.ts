import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createCalendarSchema, CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { defaultLocationValues } from 'src/schemas/eventSchema'

export const useCreateCalendar = () => {
  const methods = useForm<CreateCalendarSchema>({
    defaultValues: {
      name: '',
      description: '',
      publicUrl: '',
      profilePicture: 'https://i.pinimg.com/564x/b4/b3/02/b4b3023700b1669b0a8eb93d70a5f08f.jpg',
      coverPicture: '',
      color: '',
      location: defaultLocationValues
    },
    resolver: yupResolver(createCalendarSchema)
  })

  return { methods }
}
