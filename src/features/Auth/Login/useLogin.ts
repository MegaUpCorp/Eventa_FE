import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from 'src/schemas/authSchema'

export type LoginFormTypeValues = yup.InferType<typeof loginSchema>

export const useLogin = () => {
  const methods = useForm<LoginFormTypeValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmitForm = (values: LoginFormTypeValues) => {
    console.log(values)
  }

  return { methods, handleSubmitForm }
}
