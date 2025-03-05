import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Please enter your email')
})

const passwordSchema = yup.object().shape({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Please enter your password')
})

const strongPasswordSchema = yup.object().shape({
  Password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required')
})

const vietnamPhoneSchema = yup.object({
  PhoneNumber: yup
    .string()
    .matches(/^(0|84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/, 'Invalid Vietnamese phone number')
    .required('Phone number is required')
})

const registerInfoSchema = yup.object().shape({
  Token: yup.string().optional().default(''),
  ProfilePicture: yup.string().optional().default(''),
  UserName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot be longer than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .trim('Username cannot contain leading or trailing spaces')
})
export const signInSchema = emailSchema.concat(passwordSchema)
export const signUpSchema = registerInfoSchema.concat(strongPasswordSchema).concat(vietnamPhoneSchema)

export type EmailSchema = yup.InferType<typeof emailSchema>
export type SignInSchema = yup.InferType<typeof signInSchema>
export type SignUpSchema = yup.InferType<typeof signUpSchema>
