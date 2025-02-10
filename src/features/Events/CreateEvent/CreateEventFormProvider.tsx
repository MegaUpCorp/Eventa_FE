import { Form } from 'src/components/ui/form'
import { CreateEventForm } from './CreateEventForm'
import { FormValues, useCreateEvent } from './useCreateEvent'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer'
import { Palette } from 'lucide-react'

export const CreateEventFormProvider = () => {
  const { methods } = useCreateEvent()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-10'>
          <div className='flex flex-col col-span-7'>
            <CreateEventForm />
            <Button type='submit' className='mt-10'>
              Create Event
            </Button>
          </div>
          <div className='col-span-5'>
            <div className='rounded-lg overflow-hidden'>
              <img
                src='https://media.istockphoto.com/id/1208815143/vector/retro-future-abstract-vector-pattern.jpg?s=612x612&w=0&k=20&c=XjZfU-foIcym_ziey0eaRhADQ3d0_KDuIgU2oiNOffQ='
                className='w-full h-96'
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
          </div>
        </div>
      </form>
    </Form>
  )
}
