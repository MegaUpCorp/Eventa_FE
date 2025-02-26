import * as yup from 'yup'

export const defaultLocationValues = {
  id: '',
  name: '',
  address: '',
  lat: 0,
  lng: 0
}

export const createEventSchema = yup.object().shape({
  calendarId: yup.string().required('Please select a calendar'),
  visibility: yup.string().oneOf(['public', 'private']).required('Please select visibility').default('public'),
  title: yup.string().required('Please enter a title'),
  startDate: yup.string().required('Please select a start date'),
  endDate: yup.string().required('Please select an end date'),
  location: yup
    .object()
    .required()
    .shape({
      id: yup.string().required('Please select a location'),
      name: yup.string().required('Please enter a location name'),
      address: yup.string().required('Please enter a location address'),
      lat: yup.number().required('Please enter a location latitude'),
      lng: yup.number().required('Please enter a location longitude')
    }),
  isOnline: yup
    .boolean()
    .required()
    .when('location', {
      is: (location: typeof defaultLocationValues) => !location.id,
      then: (schema) => schema.default(true),
      otherwise: (schema) => schema.default(false)
    }),
  meetUrl: yup.string().when('isOnline', {
    is: true,
    then: (schema) => schema.required('Please enter a meeting URL'),
    otherwise: (schema) => schema.notRequired().default('')
  }),
  type: yup.string().required().oneOf(['free', 'paid']).required('Please select an event type'),
  price: yup.number().when('type', {
    is: 'paid',
    then: (schema) => schema.required('Please enter a price'),
    otherwise: (schema) => schema.notRequired().default(0)
  }),
  description: yup.string().required('Please enter a description'),
  isFree: yup.boolean().when('type', {
    is: 'free',
    then: (schema) => schema.default(true),
    otherwise: (schema) => schema.default(false)
  }),
  requiresApproval: yup.boolean().required('Please select if event requires approval'),
  capacity: yup.string().required('Please enter a capacity'),
  slug: yup.string().notRequired().default(''),
  profilePicture: yup.string().required('Please upload a profile picture')
})

export type CreateEventSchema = yup.InferType<typeof createEventSchema>
