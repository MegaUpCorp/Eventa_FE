import { LoginFormProvider } from 'src/features/Auth/Login/LoginFormProvider'
import { Icons } from '../Icons'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { AuthHeader } from './AuthHeader'

export const LoginTab = () => {
  return (
    <div className='flex flex-col gap-3 mt-3'>
      <AuthHeader title='Sign in' />
      <Button variant='outline' size='lg'>
        <Icons.google />
        <Label className='flex-1 cursor-pointer'>Continue with Google</Label>
      </Button>
      <div className='flex items-center justify-center w-full my-3'>
        <div className='w-full border-b bg-border' />
        <p className='text-muted-foreground text-sm mx-3'>or</p>
        <div className='w-full border-b bg-border' />
      </div>
      <LoginFormProvider />
    </div>
  )
}
