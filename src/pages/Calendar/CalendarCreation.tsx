import CreateCalendarFormProvider from 'src/features/Calendars/CreateCalendar/CreateCalendarFormProvider'

const CalendarCreation = () => {
  return (
    <div className='container-xl'>
      <p className='text-4xl font-semibold mb-8'>Create calendar</p>
      <CreateCalendarFormProvider />
    </div>
  )
}

export default CalendarCreation
