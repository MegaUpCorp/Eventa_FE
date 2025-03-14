import { useForm } from 'react-hook-form'

export const useAddHost = () => {
  const methods = useForm()

  return { methods }
}
