import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { signInSchema, SignInSchema } from 'src/schemas/authSchema'

export const useSignIn = () => {
  const methods = useForm<SignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema)
  })

  return { methods }
}
