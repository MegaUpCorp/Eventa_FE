import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'src/components/ui/input-otp'

export const OtpAuthForm = () => {
  return (
    <div className='mx-auto'>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoFocus>
        <div className='flex items-center justify-between gap-3'>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </div>
      </InputOTP>
    </div>
  )
}
