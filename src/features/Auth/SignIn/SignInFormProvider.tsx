import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { SignInSchema } from 'src/schemas/authSchema'
import { useSignIn } from './useSignIn'

export const SignInFormProvider = () => {
  const { methods, loginMutation } = useSignIn()

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    loginMutation.mutate(data)
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
                <Input placeholder='example@gmail.com' {...field} autoFocus autoComplete='off' />
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
                <Input type='password' {...field} autoComplete='off' />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full text-white' isLoading={loginMutation.isPending}>
          Continue
        </Button>
      </form>
    </Form>
  )
}
