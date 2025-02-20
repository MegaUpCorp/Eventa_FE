import { ArrowUp } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Card } from 'src/components/ui/card'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { CreateCalendarFormValues } from './useCreateCalendar'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const CalendarProfileForm = () => {
  const { control, setValue } = useFormContext<CreateCalendarFormValues>()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }
    // TODO: Call API to upload the file then set the value
    setValue('calendarProfile', URL.createObjectURL(acceptedFiles[0]))
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
        name='calendarProfile'
        render={({ field: { value } }) => (
          <FormItem>
            <FormControl>
              {value ? (
                <div className='flex justify-end items-start w-24 h-24' {...getRootProps()}>
                  <img src={value} className='w-full h-full object-cover rounded-lg cursor-pointer' />
                  <input {...getInputProps()} />
                </div>
              ) : (
                <Card
                  className='flex justify-end items-start w-24 h-24
                  4 hover:bg-gray-dark cursor-pointer relative'
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <img
                    src='https://i.pinimg.com/564x/b4/b3/02/b4b3023700b1669b0a8eb93d70a5f08f.jpg'
                    alt='default-placeholder'
                    className='w-full h-full object-cover rounded-lg'
                  />
                  <div className='absolute p-1 rounded-lg bg-accent bottom-1 right-1'>
                    <ArrowUp size={16} />
                  </div>
                </Card>
              )}
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}

export default CalendarProfileForm
