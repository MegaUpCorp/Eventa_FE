import * as yup from 'yup'
import { locationSchema } from './eventSchema'

const calendarDetailSchema = yup.object().shape({
  name: yup.string().required('Please enter a name for your calendar'),
  description: yup.string().optional(),
  publicUrl: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Public URL must be in slug format (lowercase letters, numbers, and hyphens only)'
    )
    .required('Please enter a public URL for your calendar'),
  profilePicture: yup.string().required('Please upload a profile picture for your calendar'),
  coverPicture: yup.string().optional(),
  color: yup.string().optional()
})

export const createCalendarSchema = calendarDetailSchema.concat(locationSchema)

export type CreateCalendarSchema = yup.InferType<typeof createCalendarSchema>
