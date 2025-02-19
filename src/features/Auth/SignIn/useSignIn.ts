import authService from 'src/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useToast } from 'src/hooks/use-toast'
import { signInSchema, SignInSchema } from 'src/schemas/authSchema'
import { useAuthStore } from 'src/config/zustand/AuthStore'

export const useSignIn = () => {
  const { toast } = useToast()
  const { setIsOpenDialog } = useAuthStore()

  const methods = useForm<SignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema)
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      setIsOpenDialog(false)
      return toast({
        title: '🎉 Welcome to Eventa!',
        description: 'We are happy to see you again!',
        duration: 5000
      })
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) {
        methods.setValue('password', '')
        return toast({
          title: '❌ Oops!',
          description: 'Email or password is incorrect!',
          duration: 5000
        })
      } else {
        return toast({
          title: 'Something went wrong!',
          description: error.message,
          duration: 5000
        })
      }
    }
  })

  return { methods, loginMutation }
}
