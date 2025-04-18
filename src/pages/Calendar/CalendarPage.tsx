import ViewCalendars from 'src/features/Calendars/ViewCalendars/ViewCalendars'
import { Separator } from 'src/components/ui/separator'
import { useGetMyCalendars } from 'src/features/Calendars/ViewCalendars/useGetMyCalendars'
import { useGetMySubscribedCaledars } from 'src/features/Calendars/ViewCalendars/useGetMySubscribedCaledars'

const CalendarPage = () => {
  const { data: myCalendars } = useGetMyCalendars()

  const { data: mySubscribedCalendars } = useGetMySubscribedCaledars()

  return (
    <div className='container-lg flex flex-col gap-4 px-4'>
      <p className='text-3xl font-semibold mb-4'>Calendars</p>
      <ViewCalendars calendars={myCalendars?.data || []} type='owned' />
      <Separator className='my-4' />
      <ViewCalendars calendars={mySubscribedCalendars?.data || []} type='subscribed' />
    </div>
  )
}

export default CalendarPage
