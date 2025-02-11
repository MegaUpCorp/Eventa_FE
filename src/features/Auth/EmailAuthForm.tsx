import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { emailSchema, EmailSchemaType } from 'src/schemas/authSchema'

interface EmailAuthFormProps {
  setAuthState: (state: 'email' | 'otp') => void
}

export const EmailAuthForm = ({ setAuthState }: EmailAuthFormProps) => {
  const methods = useForm<EmailSchemaType>({ defaultValues: { email: '' }, resolver: yupResolver(emailSchema) })

  const onSubmit: SubmitHandler<EmailSchemaType> = (data) => {
    console.log(data)
    setAuthState('otp')
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-8 relative'>
        <FormField
          control={methods.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Continue with Email
        </Button>
      </form>
    </Form>
  )
}
