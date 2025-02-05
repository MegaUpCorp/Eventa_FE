import { FormProvider } from 'react-hook-form'
import { LoginForm } from './LoginForm'
import { useLogin } from './useLogin'
import { Button } from 'src/components/ui/button'

export const LoginFormProvider = () => {
  const { methods, handleSubmitForm } = useLogin()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)} className='flex flex-col gap-3 w-full'>
        <LoginForm />
        <Button className='w-full'>Login</Button>
      </form>
    </FormProvider>
  )
}
