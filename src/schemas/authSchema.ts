import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Please enter your email')
})

export const otpSchema = yup.object().shape({
  otp: yup.string().length(6, 'Invalid OTP').required('Please enter your OTP')
})

export type EmailSchemaType = yup.InferType<typeof emailSchema>
export type OtpSchemaType = yup.InferType<typeof otpSchema>
