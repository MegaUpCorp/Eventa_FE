import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { LoginFormTypeValues } from './useLogin'
import { createElement, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export const LoginForm = () => {
  const { control } = useFormContext<LoginFormTypeValues>()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  return (
    <div className='flex flex-col gap-8 mb-6'>
      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem className='relative'>
            <FormLabel className='font-semibold'>Email</FormLabel>
            <FormControl>
              <Input placeholder='example@gmail.com' {...field} autoFocus spellCheck={false} />
            </FormControl>
            <FormMessage className='absolute text-xs' />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem className='relative'>
            <FormLabel className='font-semibold'>Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  {...field}
                  type={passwordVisibility ? 'text' : 'password'}
                  autoComplete='on'
                  spellCheck={false}
                />
                <div
                  className='absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground'
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                    className: 'h-5 w-5'
                  })}
                </div>
              </div>
            </FormControl>
            <FormMessage className='absolute text-xs' />
          </FormItem>
        )}
      />
    </div>
  )
}
