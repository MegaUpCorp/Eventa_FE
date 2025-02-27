import { CloudUpload, Loader2, Palette } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { appwriteStorage } from 'src/config/appwrite/appwrite'
import { useUpload } from 'src/config/appwrite/useUpload'
import { cn } from 'src/lib/utils'
import { CreateEventSchema } from 'src/schemas/eventSchema'
import { isFormError } from 'src/utils/utils'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export const EventCoverForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext<CreateEventSchema>()
  const { mutateAsync, isPending } = useUpload()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }

    mutateAsync(acceptedFiles[0]).then((response) => {
      const appwriteImg = appwriteStorage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID, response.$id)
      setValue('profilePicture', appwriteImg)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  return (
    <>
      <div className='rounded-lg overflow-hidden'>
        <FormField
          control={control}
          name='profilePicture'
          render={() => (
            <FormItem>
              <FormControl>
                {getValues('profilePicture') ? (
                  <div className='flex justify-center h-80 items-center' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={getValues('profilePicture')} className='w-full h-full object-cover rounded-lg' />
                  </div>
                ) : (
                  <Card
                    className={cn(
                      'flex justify-center items-center h-80 border-dashed border-2',
                      isFormError(errors, 'profilePicture') && 'border-[#ff000059] border-2'
                    )}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className='flex flex-col items-center justify-center cursor-pointer'>
                      {isPending ? (
                        <Loader2 className='animate-spin text-muted-foreground' />
                      ) : (
                        <>
                          <CloudUpload size={85} className='text-muted-foreground' />
                          {isDragActive ? (
                            <p className='text-sm text-muted-foreground'>Drop here...</p>
                          ) : (
                            <>
                              <p className='text-sm text-muted-foreground'>Click to upload image</p>
                              <p className='text-sm text-muted-foreground'>Or drag and drop</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </Card>
                )}
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline' size='lg' className='my-4 w-full'>
            <Palette />
            Choose a theme
          </Button>
        </DrawerTrigger>
        <DrawerContent>Choose theme content</DrawerContent>
      </Drawer>
    </>
  )
}
