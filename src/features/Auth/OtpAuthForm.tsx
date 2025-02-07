import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'src/components/ui/input-otp'

export const OtpAuthForm = () => {
  return (
    <div className='mx-auto'>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <div className='flex items-center justify-between gap-3'>
          <InputOTPGroup>
            <InputOTPSlot index={0} autoFocus className='w-12 h-12' />
            <InputOTPSlot index={1} className='w-12 h-12' />
            <InputOTPSlot index={2} className='w-12 h-12' />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className='w-12 h-12' />
            <InputOTPSlot index={2} className='w-12 h-12' />
            <InputOTPSlot index={5} className='w-12 h-12' />
          </InputOTPGroup>
        </div>
      </InputOTP>
    </div>
  )
}
