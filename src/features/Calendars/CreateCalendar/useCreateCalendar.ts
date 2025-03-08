import calendarAPI from 'src/apis/api.calendar'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { createCalendarSchema, CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { defaultLocationValues } from 'src/schemas/eventSchema'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'src/hooks/use-toast'

export const useCreateCalendar = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
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

  const createCalendarMutation = useMutation({
    mutationFn: calendarAPI.createCalendar,
    onSuccess: () => {
      navigate(`/calendars/${methods.getValues().publicUrl}`)
      methods.reset()
      return toast({
        title: '🎉 Calendar created!',
        description: 'You have successfully created a new calendar!',
        duration: 5000
      })
    }
  })

  return { methods, createCalendarMutation }
}
