import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { emailSchema, EmailSchema, signUpSchema, SignUpSchema } from 'src/schemas/authSchema'

export const useSignUp = () => {
  const emailMethods = useForm<EmailSchema>({ defaultValues: { email: '' }, resolver: yupResolver(emailSchema) })

  const accountInfoMethods = useForm<SignUpSchema>({
    defaultValues: { accountName: '', avatar: '', password: '' },
    resolver: yupResolver(signUpSchema)
  })

  return { emailMethods, accountInfoMethods }
}
