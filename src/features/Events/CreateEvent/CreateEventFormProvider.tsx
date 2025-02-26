import CreateEventForm from './CreateEventForm'
import { Form } from 'src/components/ui/form'
import { useCreateEvent } from './useCreateEvent'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { EventCoverForm } from './EventCoverForm'
import { CircleCheckBig, Loader2 } from 'lucide-react'
import { toSlug } from 'src/utils/utils'
import { CreateEventSchema } from 'src/schemas/eventSchema'

export const CreateEventFormProvider = () => {
  const { methods, createEventMutation } = useCreateEvent()

  const onSubmit: SubmitHandler<CreateEventSchema> = async (data) => {
    // console.log({ ...data, slug: toSlug(data.title, false) || '' })
    createEventMutation.mutate({ ...data, slug: toSlug(data.title, false) || '' })
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-10'>
          <div className='flex flex-col col-span-7'>
            <CreateEventForm />
            <Button type='submit' className='mt-8 text-white' disabled={createEventMutation.isPending}>
              {createEventMutation.isPending ? <Loader2 className='animate-spin' /> : <CircleCheckBig />}
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
