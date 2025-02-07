import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ChevronLeft, CircleUserRound } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Icons } from './Icons'
import { useState } from 'react'
import { EmailAuthForm } from 'src/features/Auth/EmailAuthForm'
import { OtpAuthForm } from 'src/features/Auth/OtpAuthForm'

export type AuthState = 'email' | 'otp'

export const AuthDialog = () => {
  const [authState, setAuthState] = useState<AuthState>('email')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>
          <CircleUserRound />
          Join us now
        </Button>
      </DialogTrigger>
      <DialogContent className='[&>button]:hidden min-h-44 max-w-sm'>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Auth</DialogTitle>
            <DialogDescription>Fixed the warning</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {authState === 'email' ? (
          <div className='flex flex-col'>
            <Label className='block text-2xl font-bold mb-1'>Welcome to Eventa</Label>
            <p className='text-muted-foreground mb-6'>Sign in or sign up to continue</p>
            <Button variant='outline'>
              <Icons.google className='mr-2' style={{ width: 18, height: 18 }} />
              <p>Continue with Google</p>
            </Button>
            <div className='flex items-center justify-center w-full my-4'>
              <div className='w-full border-b bg-border' />
              <p className='text-muted-foreground text-xs mx-3'>or</p>
              <div className='w-full border-b bg-border' />
            </div>
            <EmailAuthForm setAuthState={setAuthState} />{' '}
          </div>
        ) : null}
        {authState === 'otp' ? (
          <div className='flex flex-col'>
            <Button variant='secondary' className='rounded-full w-8 h-8 mb-8' onClick={() => setAuthState('email')}>
              <ChevronLeft />
            </Button>
            <Label className='block text-2xl font-bold mb-1'>Enter OTP</Label>
            <p className='text-muted-foreground mb-6'>
              Type in the 6-digit code we sent to <p className='font-semibold'>example@gmail.com</p>
            </p>
            <OtpAuthForm />
            <Button variant='ghost' className='my-8 mx-auto text-muted-foreground'>
              Resend Code
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
