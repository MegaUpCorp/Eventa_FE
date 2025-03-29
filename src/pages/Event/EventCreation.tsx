import { Navigate, useNavigate } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import { CreateEventFormProvider } from 'src/features/Events/CreateEvent/CreateEventFormProvider'
import { useToast } from 'src/hooks/use-toast'

const EventCreation = () => {
  const { isAuthenticated } = useUserStore()
  const { toast } = useToast()
  if(!isAuthenticated) {
    toast({
      title: '🎉 You need login to use function',
      description: 'Please login to your account!',
      duration: 5000
    })
    return <Navigate to='/' />
  }
  return (
    
    <div className='container-lg p-4'>
      <CreateEventFormProvider />
    </div>
  )
}

export default EventCreation
