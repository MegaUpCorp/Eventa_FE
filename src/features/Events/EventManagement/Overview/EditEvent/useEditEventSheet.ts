import { useForm } from 'react-hook-form'

export const useEditEventSheet = () => {
  const methods = useForm()

  return { methods }
}
