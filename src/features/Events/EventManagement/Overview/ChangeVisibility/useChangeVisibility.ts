import { useForm } from 'react-hook-form'

export const useChangeVisibility = () => {
  const methods = useForm()

  return { methods }
}
