import authService from 'src/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useToast } from 'src/hooks/use-toast'
import { signInSchema, SignInSchema } from 'src/schemas/authSchema'

export const useSignIn = () => {
  const { toast } = useToast()
  const methods = useForm<SignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema)
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () =>
      toast({
        title: '🎉 Welcome to Eventa!',
        description: 'We are happy to see you again!'
      }),
    onError: (error: AxiosError) => {
      if (error.status === 401) {
        methods.setValue('password', '')
        return toast({
          title: '❌ Oops!',
          description: 'Email or password is incorrect!'
        })
      } else {
        return toast({
          title: 'Something went wrong!',
          description: error.message
        })
      }
    }
  })

  return { methods, loginMutation }
}
