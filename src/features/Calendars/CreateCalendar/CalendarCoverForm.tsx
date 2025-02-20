import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { CreateCalendarFormValues } from './useCreateCalendar'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const CalendarCoverForm = () => {
  const { control, setValue } = useFormContext<CreateCalendarFormValues>()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }
    // TODO: Call API to upload the file then set the value
    setValue('calendarCover', URL.createObjectURL(acceptedFiles[0]))
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
      name='calendarCover'
      render={({ field: { value } }) => (
        <FormItem>
          <FormControl>
            {value ? (
              <div className='flex justify-end items-start h-48' {...getRootProps()}>
                <img src={value} className='w-full h-full object-cover rounded-t-lg cursor-pointer' />
                <input {...getInputProps()} />
              </div>
            ) : (
              <div className='flex justify-end items-start h-48 rounded-t-lg cursor-pointer' {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant='ghost' className='mt-3 mr-3'>
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
