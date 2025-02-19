import { CloudUpload } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useAuthStore } from 'src/config/zustand/AuthStore'
import { cn } from 'src/lib/utils'
import { SignUpSchema } from 'src/schemas/authSchema'
import { useSignUp } from './useSignUp'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export const AccountInfoFormProvider = () => {
  const { accountInfoMethods } = useSignUp()
  const { setIsOpenDialog, setState } = useAuthStore()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }
    // TODO: Call API to upload the file then set the value
    accountInfoMethods.setValue('avatar', URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log(data)
    setIsOpenDialog(false)
    setTimeout(() => {
      setState('sign-in')
    }, 500)
  }

  return (
    <Form {...accountInfoMethods}>
      <form onSubmit={accountInfoMethods.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <FormField
            control={accountInfoMethods.control}
            name='avatar'
            render={({ field: { value } }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'flex justify-center items-center w-24 h-24 rounded-full cursor-pointer',
                      !value ? 'border-2 border-dashed' : ''
                    )}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {value ? (
                      <img src={value} className='w-24 h-24 rounded-full' />
                    ) : (
                      <CloudUpload size={32} className='text-muted-foreground' />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-3 w-full'>
            <FormField
              control={accountInfoMethods.control}
              name='accountName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Your account name' {...field} className='w-full' autoFocus />
                  </FormControl>
                  <FormMessage className='' />
                </FormItem>
              )}
            />
            <FormField
              control={accountInfoMethods.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Your account password' {...field} className='w-full' />
                  </FormControl>
                  <FormMessage className='' />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit' className='text-white'>
          Let&apos;s Go
        </Button>
      </form>
    </Form>
  )
}
