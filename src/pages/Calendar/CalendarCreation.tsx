import CreateCalendarFormProvider from 'src/features/Calendars/CreateCalendar/CreateCalendarFormProvider'

const CalendarCreation = () => {
  return (
    <div className='container-base px-4'>
      <p className='text-4xl font-semibold mb-4'>Create calendar</p>
      <CreateCalendarFormProvider />
    </div>
  )
}

export default CalendarCreation
