import * as React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip'
import { cn } from 'src/lib/utils'
import { ArrowBigUpDash, EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  StartIcon?: LucideIcon
  EndIcon?: LucideIcon
  onClickStartIcon?: () => void
  onClickEndIcon?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ StartIcon, EndIcon, className, type, onClickStartIcon, onClickEndIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [capsLockActive, setCapsLockActive] = React.useState(false)

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const capsLockOn = event.getModifierState('CapsLock')
      setCapsLockActive(capsLockOn)
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const inputClasses = cn(
      'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      StartIcon && 'pl-10',
      EndIcon && 'pr-10',
      type === 'password' && (!capsLockActive ? 'pr-8' : 'pr-16'),
      className
    )

    return (
      <div className={cn('relative', className)}>
        {StartIcon && (
          <button
            type='button'
            className='absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer'
            onClick={onClickStartIcon}
          >
            <StartIcon size={18} className='text-slate-500' />
          </button>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={inputClasses}
          onKeyDown={handleKeyPress}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <button
            type='button'
            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
            onClick={onClickEndIcon}
          >
            <EndIcon size={18} className='text-slate-500' />
          </button>
        )}
        {type === 'password' && (
          <div className='absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1'>
            {showPassword ? (
              <EyeOffIcon className='cursor-pointer' onClick={togglePasswordVisibility} size={20} />
            ) : (
              <EyeIcon className='cursor-pointer' onClick={togglePasswordVisibility} size={20} />
            )}
            {capsLockActive && type === 'password' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ArrowBigUpDash size={20} />
                  </TooltipTrigger>
                  <TooltipContent className='font-medium text-white'>
                    <p>Caps Lock is on!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
