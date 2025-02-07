import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'src/components/ui/input-otp'

export const OtpAuthForm = () => {
  return (
    <div className='mx-auto'>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoFocus>
        <InputOTPGroup>
          <InputOTPSlot index={0} className='w-12 h-12' />
          <InputOTPSlot index={1} className='w-12 h-12' />
          <InputOTPSlot index={2} className='w-12 h-12' />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className='w-12 h-12' />
          <InputOTPSlot index={2} className='w-12 h-12' />
          <InputOTPSlot index={5} className='w-12 h-12' />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
