import { Form } from 'src/components/ui/form'
import { CreateEventForm } from './CreateEventForm'
import { FormValues, useCreateEvent } from './useCreateEvent'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { EventCoverForm } from './EventCoverForm'

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
            <Button type='submit' className='mt-8 text-white'>
              Create Event
            </Button>
          </div>
          <div className='col-span-5'>
            <EventCoverForm />
          </div>
        </div>
      </form>
    </Form>
  )
}
