import { useForm } from 'react-hook-form'

export const useSendABlast = () => {
  const methods = useForm()

  return {
    methods
  }
}
