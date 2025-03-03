import authAPI from 'src/apis/api.auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { emailSchema, EmailSchema, signUpSchema, SignUpSchema } from 'src/schemas/authSchema'

export const useSignUp = () => {
  const emailMethods = useForm<EmailSchema>({ defaultValues: { email: '' }, resolver: yupResolver(emailSchema) })

  const accountInfoMethods = useForm<SignUpSchema>({
    defaultValues: { UserName: '', ProfilePicture: '', Password: '', PhoneNumber: '' },
    resolver: yupResolver(signUpSchema)
  })

  const verifyEmailMutation = useMutation({
    mutationFn: authAPI.sendVerificationEmail
  })

  const verifyTokenMutation = useMutation({
    mutationFn: authAPI.verifyToken
  })

  const signUpMutation = useMutation({
    mutationFn: authAPI.signUp
  })

  return { emailMethods, accountInfoMethods, verifyEmailMutation, verifyTokenMutation, signUpMutation }
}
