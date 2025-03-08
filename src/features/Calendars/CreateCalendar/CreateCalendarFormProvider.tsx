import CreateCalendarForm from './CreateCalendarForm'
import { Form } from 'src/components/ui/form'
import { useCreateCalendar } from './useCreateCalendar'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { CalendarPlus } from 'lucide-react'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'

const CreateCalendarFormProvider = () => {
  const { methods, createCalendarMutation } = useCreateCalendar()

  const onSubmit: SubmitHandler<CreateCalendarSchema> = (data) => {
    createCalendarMutation.mutate(data)
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateCalendarForm />
        <Button type='submit' className='mr-auto text-white mt-4'>
          <CalendarPlus />
          Create calendar
        </Button>
      </form>
    </Form>
  )
}

export default CreateCalendarFormProvider
