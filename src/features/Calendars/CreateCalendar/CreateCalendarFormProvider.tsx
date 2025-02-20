import CreateCalendarForm from './CreateCalendarForm'
import { Form } from 'src/components/ui/form'
import { CreateCalendarFormValues, useCreateCalendar } from './useCreateCalendar'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { CalendarPlus } from 'lucide-react'

const CreateCalendarFormProvider = () => {
  const { methods } = useCreateCalendar()

  const onSubmit: SubmitHandler<CreateCalendarFormValues> = (data) => {
    console.log(data)
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateCalendarForm />
        <Button className='mr-auto text-white mt-4'>
          <CalendarPlus />
          Create calendar
        </Button>
      </form>
    </Form>
  )
}

export default CreateCalendarFormProvider
