import { useForm } from 'react-hook-form'

export const useChangeCapacity = () => {
  const methods = useForm()

  return { methods }
}
