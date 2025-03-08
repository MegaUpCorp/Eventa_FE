import { ArrowUp, Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { appwriteStorage } from 'src/config/appwrite/appwrite'
import { useUpload } from 'src/config/appwrite/useUpload'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

const CalendarProfileForm = () => {
  const { control, setValue } = useFormContext<CreateCalendarSchema>()
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  return (
    <div className='absolute top-32 left-4'>
      <FormField
        control={control}
        name='profilePicture'
        render={({ field: { value } }) => (
          <FormItem>
            <FormControl>
              <div className='flex justify-end items-start w-24 h-24' {...getRootProps()}>
                <img src={value} className='w-full h-full object-cover rounded-lg cursor-pointer' />
                <input {...getInputProps()} />
                <div className='absolute p-1 rounded-lg bg-accent bottom-1 right-1'>
                  {isPending ? <Loader2 size={16} className='animate-spin' /> : <ArrowUp size={16} />}
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}

export default CalendarProfileForm
