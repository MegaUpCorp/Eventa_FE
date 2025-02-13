import { useForm } from 'react-hook-form'

// TODO: Replace with the correct type after putting yup validation
export interface HeroSearchEventFormValues {
  location: string
  date: Date
  price: number[]
}

export const useHeroSearchEvent = () => {
  const methods = useForm<HeroSearchEventFormValues>({
    defaultValues: {
      location: 'hcm',
      date: new Date(),
      price: [0, 200_000]
    }
  })

  return { methods }
}
