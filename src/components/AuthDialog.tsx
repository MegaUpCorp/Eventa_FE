import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Mailbox } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { useAuthStore } from 'src/config/zustand/AuthStore'
import { SignInFormProvider } from 'src/features/Auth/SignIn/SignInFormProvider'
import { AccountInfoFormProvider } from 'src/features/Auth/SignUp/AccountInfoFormProvider'
import { EmailFormProvider } from 'src/features/Auth/SignUp/EmailFormProvider'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { GoogleOAuthProvider, googleClientId } from 'src/config/googleOAuthConfig'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/api.auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { jwtDecode } from 'jwt-decode'
interface AuthDialogProps {
  trigger: React.ReactNode
}

export interface LoginGoogleBody {
  accessToken: string
}
const SocialButton = ({ className }: { className: string }) => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const loginGoogleMutation = useMutation({
    mutationFn: async (body: LoginGoogleBody) => {
      return await authAPI.loginGoogle(body)
    }
  })
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      const idToken = response.credential // Google ID Token
      if (!idToken) {
        console.error('No credential found in response')
        return
      }
      const loginBody: LoginGoogleBody = { accessToken: idToken }
      await loginGoogleMutation.mutateAsync(loginBody, {
        onSuccess: (data) => {
          console.log('Login successful:', data)
          const accessToken = data.data.data.accessToken.token
          console.log('Access token:', accessToken)
          localStorage.setItem('accessToken', accessToken)
          const user = data.data.data.user
          localStorage.setItem('profile', JSON.stringify(user))
          setIsAuthenticated(true)
          toast.success(data.data.message)
          navigate('/')
        }
      })
    } catch (error) {
      console.error('Error processing Google login:', error)
    }
  }

  return (
    <div className={className}>
      <div className='flex items-center justify-center w-full my-4'>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Login Failed')} />
      </div>
      <div className='flex items-center justify-center w-full my-4'>
        <div className='w-full border-b bg-border' />
        <p className='text-muted-foreground text-xs mx-3'>or</p>
        <div className='w-full border-b bg-border' />
      </div>
    </div>
  )
}

export const AuthDialog = ({ trigger }: AuthDialogProps) => {
  const { state, setState, isOpenDialog, setIsOpenDialog } = useAuthStore()

  let dialogContent = null

  const resetDialog = () => {
    setIsOpenDialog(false)
    setTimeout(() => {
      setState('sign-in')
    }, 500)
  }

  switch (state) {
    case 'sign-up':
      dialogContent = (
        <>
          <Label className='block text-2xl font-bold mb-1'>Welcome to Eventa</Label>
          <p className='text-muted-foreground mb-6'>Enter your email below</p>
          <EmailFormProvider />
          <SocialButton className='flex flex-col-reverse' />
          <p
            className='text-sm text-center mt-10 mb-2 hover:underline cursor-pointer'
            onClick={() => setState('sign-in')}
          >
            Already have an account? <span className='font-semibold text-primary'>Sign in</span>
          </p>
        </>
      )
      break
    case 'check-email':
      dialogContent = (
        <>
          <div className='p-6 rounded-full bg-primary-foreground mx-auto'>
            <Mailbox size={56} className='text-primary' />
          </div>
          <p className='text-center font-medium mt-4 mb-2 text-2xl'>A magic link is on the way!</p>
          <p className='text-center text-muted-foreground text-sm mb-6'>
            For security reasons, we&apos;ve sent you an email that contains a link to verify your email
          </p>
          <Button variant='secondary' onClick={resetDialog}>
            Close
          </Button>
        </>
      )
      break
    case 'enter-information':
      dialogContent = (
        <>
          <Label className='block text-2xl font-bold mb-1'>Almost there!</Label>
          <p className='text-muted-foreground mb-6'>Please fill your account detail below</p>
          <AccountInfoFormProvider />
        </>
      )
      break
    default:
      dialogContent = (
        <>
          <Label className='block text-2xl font-bold mb-1'>Welcome to Eventa</Label>
          <p className='text-muted-foreground mb-6'>Sign in or sign up to continue</p>
          <SocialButton className='flex flex-col' />
          <SignInFormProvider />
          <p
            className='text-sm text-center mt-10 mb-2 hover:underline cursor-pointer'
            onClick={() => setState('sign-up')}
          >
            Don&apos;t have an account? <span className='font-semibold text-primary'>Sign up, it&apos;s free!</span>
          </p>
        </>
      )
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <Dialog
      open={isOpenDialog}
      onOpenChange={(open) => {
        if (!open) {
          resetDialog()
        }
        setIsOpenDialog(open)
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='[&>button]:hidden min-h-72 max-w-96'>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Auth</DialogTitle>
            <DialogDescription>Fixed the warning</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className='flex flex-col'>{dialogContent}</div>
      </DialogContent>
    </Dialog>
    </GoogleOAuthProvider>
  )
}
