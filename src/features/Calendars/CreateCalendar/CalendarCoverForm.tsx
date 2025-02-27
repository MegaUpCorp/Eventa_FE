import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { appwriteStorage } from 'src/config/appwrite/appwrite'
import { useUpload } from 'src/config/appwrite/useUpload'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

const CalendarCoverForm = () => {
  const { control, setValue } = useFormContext<CreateCalendarSchema>()
  const { mutateAsync, isPending } = useUpload()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }

    mutateAsync(acceptedFiles[0]).then((response) => {
      const appwriteImg = appwriteStorage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID, response.$id)
      setValue('coverPicture', appwriteImg)
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
    <FormField
      control={control}
      name='coverPicture'
      render={({ field: { value } }) => (
        <FormItem>
          <FormControl>
            {value ? (
              <div className='flex justify-end items-start h-48 relative' {...getRootProps()}>
                <img src={value} className='w-full h-full object-cover rounded-t-lg cursor-pointer' />
                <input {...getInputProps()} />
                <Button variant='secondary' className='absolute top-3 right-3' isLoading={isPending}>
                  Change cover
                </Button>
              </div>
            ) : (
              <div className='flex justify-end items-start h-48 rounded-t-lg cursor-pointer' {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant='secondary' className='mt-3 mr-3' isLoading={isPending}>
                  Change cover
                </Button>
              </div>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default CalendarCoverForm
