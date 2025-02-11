import { CloudUpload, Palette } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { FormValues } from './useCreateEvent'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const EventCoverForm = () => {
  const { control, setValue } = useFormContext<FormValues>()

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length || !acceptedFiles.length) {
      return
    }
    // TODO: Call API to upload the file then set the value
    setValue('eventCover', URL.createObjectURL(acceptedFiles[0]))
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
          name='eventCover'
          render={({ field: { value } }) => (
            <FormItem>
              <FormControl>
                {value ? (
                  <img src={value} className='w-full h-96 rounded-lg' />
                ) : (
                  <Card className='flex justify-center items-center h-96 border-dashed border-2' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='flex flex-col items-center justify-center'>
                      <CloudUpload size={85} className='text-muted-foreground' />
                      {isDragActive ? (
                        <p className='text-sm text-muted-foreground'>Drop here...</p>
                      ) : (
                        <>
                          <p className='text-sm text-muted-foreground'>Click to upload image</p>
                          <p className='text-sm text-muted-foreground'>Or drag and drop</p>
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
