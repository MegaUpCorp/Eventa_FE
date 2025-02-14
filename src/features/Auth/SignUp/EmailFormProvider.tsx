import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useAuthStore } from 'src/config/zustand/auth-store'
import { EmailSchema } from 'src/schemas/authSchema'
import { useSignUp } from './useSignUp'

export const EmailFormProvider = () => {
  const { setState } = useAuthStore()
  const { emailMethods } = useSignUp()

  const onSubmit: SubmitHandler<EmailSchema> = (data) => {
    console.log(data)
    setState('check-email')
  }

  return (
    <Form {...emailMethods}>
      <form onSubmit={emailMethods.handleSubmit(onSubmit)} className='space-y-8 relative'>
        <FormField
          control={emailMethods.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} autoFocus />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full text-white'>
          Continue with Email
        </Button>
      </form>
    </Form>
  )
}
