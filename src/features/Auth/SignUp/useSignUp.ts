import authAPI from 'src/apis/api.auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { emailSchema, EmailSchema, signUpSchema, SignUpSchema } from 'src/schemas/authSchema'

export const useSignUp = () => {
  const emailMethods = useForm<EmailSchema>({ defaultValues: { email: '' }, resolver: yupResolver(emailSchema) })

  const accountInfoMethods = useForm<SignUpSchema>({
    defaultValues: { accountName: '', avatar: '', password: '' },
    resolver: yupResolver(signUpSchema)
  })

  const verifyEmailMutation = useMutation({
    mutationFn: authAPI.sendVerificationEmail
  })

  return { emailMethods, accountInfoMethods, verifyEmailMutation }
}
