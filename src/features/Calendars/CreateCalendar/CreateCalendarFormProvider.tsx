import CreateCalendarForm from './CreateCalendarForm'
import { Form } from 'src/components/ui/form'
import { CreateCalendarFormValues, useCreateCalendar } from './useCreateCalendar'
import { SubmitHandler } from 'react-hook-form'

const CreateCalendarFormProvider = () => {
  const { methods } = useCreateCalendar()

  const onSubmit: SubmitHandler<CreateCalendarFormValues> = (data) => {
    console.log(data)
  }
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateCalendarForm />
      </form>
    </Form>
  )
}

export default CreateCalendarFormProvider
