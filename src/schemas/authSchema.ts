import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Please enter your email')
})

const passwordSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter your password')
})

const strongPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required')
})

const registerInfoSchema = yup.object().shape({
  avatar: yup.string().optional().default(''),
  accountName: yup.string().required('Please enter your account name')
})

export const signInSchema = emailSchema.concat(passwordSchema)
export const signUpSchema = registerInfoSchema.concat(strongPasswordSchema)

export type EmailSchema = yup.InferType<typeof emailSchema>
export type SignInSchema = yup.InferType<typeof signInSchema>
export type SignUpSchema = yup.InferType<typeof signUpSchema>
