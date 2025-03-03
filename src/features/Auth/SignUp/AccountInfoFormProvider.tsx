import { CloudUpload, Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useAuthStore } from 'src/config/zustand/AuthStore'
import { cn } from 'src/lib/utils'
import { SignUpSchema } from 'src/schemas/authSchema'
import { isFormError } from 'src/utils/utils'
import { useSignUp } from './useSignUp'
import { useUpload } from 'src/config/appwrite/useUpload'
import { appwriteStorage } from 'src/config/appwrite/appwrite'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export const AccountInfoFormProvider = () => {
  const { accountInfoMethods, signUpMutation } = useSignUp()
  const { mutateAsync, isPending } = useUpload()
  const { setIsOpenDialog, setState } = useAuthStore()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }

    mutateAsync(acceptedFiles[0]).then((response) => {
      const appwriteImg = appwriteStorage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID, response.$id)
      accountInfoMethods.setValue('ProfilePicture', appwriteImg)
    })
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
    const token = JSON.parse(localStorage.getItem('token') || '{}')?.token?.trim()

    if (!token) return

    signUpMutation.mutateAsync({ ...data, Token: token }).then(() => {
      setIsOpenDialog(false)
      setTimeout(() => {
        setState('sign-in')
      }, 500)
    })
  }

  return (
    <Form {...accountInfoMethods}>
      <form onSubmit={accountInfoMethods.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <div className='flex items-start gap-4'>
          <FormField
            control={accountInfoMethods.control}
            name='ProfilePicture'
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
                    ) : isPending ? (
                      <Loader2 size={18} className='text-muted-foreground animate-spin' />
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
              name='PhoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Phone number'
                      {...field}
                      spellCheck={false}
                      className={cn(
                        'w-full focus-visible:ring-0',
                        isFormError(accountInfoMethods.formState.errors, 'PhoneNumber') && 'border-[#ff000059]'
                      )}
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={accountInfoMethods.control}
              name='UserName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Username'
                      {...field}
                      spellCheck={false}
                      className={cn(
                        'w-full focus-visible:ring-0',
                        isFormError(accountInfoMethods.formState.errors, 'UserName') && 'border-[#ff000059]'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={accountInfoMethods.control}
              name='Password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='Password'
                      placeholder='Password'
                      {...field}
                      spellCheck={false}
                      className={cn(
                        'w-full focus-visible:ring-0',
                        isFormError(accountInfoMethods.formState.errors, 'Password') && 'border-[#ff000059]'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit' className='text-white' isLoading={signUpMutation.isPending}>
          Let&apos;s Go
        </Button>
      </form>
    </Form>
  )
}
