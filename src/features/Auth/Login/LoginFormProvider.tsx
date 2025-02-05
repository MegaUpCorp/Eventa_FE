import { FormProvider } from 'react-hook-form'
import { LoginForm } from './LoginForm'
import { useLogin } from './useLogin'

export const LoginFormProvider = () => {
  const { methods, handleSubmitForm } = useLogin()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
        <LoginForm />
      </form>
    </FormProvider>
  )
}
