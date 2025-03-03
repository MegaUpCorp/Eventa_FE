import CreateCalendarFormProvider from 'src/features/Calendars/CreateCalendar/CreateCalendarFormProvider'

const CalendarCreation = () => {
  return (
    <div className='container-base px-4'>
      <p className='text-3xl font-semibold mb-4'>Create Calendar</p>
      <CreateCalendarFormProvider />
    </div>
  )
}

export default CalendarCreation
