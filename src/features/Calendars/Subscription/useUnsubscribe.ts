import calendarAPI from 'src/apis/api.calendar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useToast } from 'src/hooks/use-toast'

export const useUnsubscribe = () => {
  const queryClient = useQueryClient()
  const { publicUrl } = useParams()
  const { user } = useUserStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: calendarAPI.unsubscribeCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarDetail', publicUrl, user?.id] })
      queryClient.invalidateQueries({ queryKey: ['getMySubscribedCalendars', user?.id] })
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) {
        return toast({
          title: '❌ You have already unsubscribed to this calendar!',
          description: 'Try subscribing first!',
          duration: 5000
        })
      }
      return toast({
        title: '❌ Something went wrong!',
        description: error.message,
        duration: 5000
      })
    }
  })
}
