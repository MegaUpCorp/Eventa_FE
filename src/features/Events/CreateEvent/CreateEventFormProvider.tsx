import CreateEventForm from './CreateEventForm'
import { Form } from 'src/components/ui/form'
import { defaultValues, useCreateEvent } from './useCreateEvent'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { EventCoverForm } from './EventCoverForm'
import { CircleCheckBig, Loader2 } from 'lucide-react'
import { toSlug } from 'src/utils/utils'
import { CreateEventSchema } from 'src/schemas/eventSchema'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useToast } from 'src/hooks/use-toast'

export const CreateEventFormProvider = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { methods, createEventMutation, myCalendars } = useCreateEvent()

  const onSubmit: SubmitHandler<CreateEventSchema> = async (data) => {
    const slug = toSlug(data.title, false) || ''
    createEventMutation
      .mutateAsync({ ...data, slug })
      .then(() => {
        const calendarId = methods.getValues('calendarId')
        navigate(`/events/manage/${slug}`)
        methods.reset({ ...defaultValues, calendarId })
        localStorage.removeItem('event-desc')
        return toast({
          title: '🎉 Create event successfully!',
          description: 'We are redirecting you to the event management page!',
          duration: 5000
        })
      })
      .catch((error: AxiosError) => {
        return toast({
          title: '❌ Oops!',
          description: error.message,
          duration: 5000
        })
      })
  }

  useEffect(() => {
    if (myCalendars && myCalendars.data) {
      const personalCalendar =
        myCalendars.data.find((calendar) => calendar.name === 'Personal')?.id || myCalendars.data[0]?.id || 'none'
      methods.setValue('calendarId', personalCalendar)
    }
  }, [myCalendars?.data, methods])

  return (
    <Form {...methods}>
      <form key={methods.watch('calendarId')} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-10'>
          <div className='flex flex-col col-span-7'>
            <CreateEventForm calendars={myCalendars?.data || []} />
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
