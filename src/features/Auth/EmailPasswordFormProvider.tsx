import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { signInSchema, SignInSchema } from 'src/schemas/authSchema'

export const EmailPasswordFormProvider = () => {
  const methods = useForm<SignInSchema>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema)
  })

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    console.log(data)
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
                <Input placeholder='example@gmail.com' {...field} autoFocus autoComplete='on' />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} autoComplete='on' />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full text-white'>
          Continue
        </Button>
      </form>
    </Form>
  )
}
