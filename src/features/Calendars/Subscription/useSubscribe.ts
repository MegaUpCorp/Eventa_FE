import calendarAPI from 'src/apis/api.calendar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useToast } from 'src/hooks/use-toast'
import { AxiosError } from 'axios'

export const useSubscribe = () => {
  const queryClient = useQueryClient()
  const { publicUrl } = useParams()
  const { user } = useUserStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: calendarAPI.subscribeCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarDetail', publicUrl, user?.id] })
      queryClient.invalidateQueries({ queryKey: ['getMySubscribedCalendars', user?.id] })
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) {
        return toast({
          title: '❌ You have already subscribed to this calendar!',
          description: 'Try unsubscribing first!',
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
