import { CalendarX2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { cn } from 'src/lib/utils'

type CalendarType = 'owned' | 'subscribed'

interface ViewCalendarsProps {
  type: CalendarType
  calendars: { id: number; name: string; profile: string; subscribers: number }[]
  className?: string
}

const getCalendarsContent = (type: CalendarType) => {
  if (type === 'owned') {
    return {
      title: 'My Calendars',
      emptyTitle: 'No Calendars',
      emptyDescription: 'You are not an admin of any calendars.'
    }
  }
  if (type === 'subscribed') {
    return {
      title: 'Subscribed Calendars',
      emptyTitle: 'No Subscriptions',
      emptyDescription: 'You have not subscribed to any calendars.'
    }
  }
  return {}
}

const ViewCalendars = ({ type, calendars, className }: ViewCalendarsProps) => {
  const { title, emptyDescription, emptyTitle } = getCalendarsContent(type)

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-xl font-semibold'>{title}</p>
        {type === 'owned' && (
          <Link to='/calendars/create' className={buttonVariants({ variant: 'secondary' })}>
            <Plus />
            Create
          </Link>
        )}
      </div>
      <div className={cn('grid grid-cols-3 gap-5', className)}>
        {calendars.length === 0 ? (
          <Card className='p-4 flex flex-col gap-1 h-42'>
            <CalendarX2 className='w-12 h-12 text-muted-foreground' />
            <p className='text-lg mt-2 font-semibold truncate text-muted-foreground'>{emptyTitle}</p>
            <p className='text-muted-foreground text-sm font-medium'>{emptyDescription}</p>
          </Card>
        ) : (
          calendars.map((calendar) => (
            <Card key={calendar.id} className='p-4 flex flex-col gap-1 h-42 cursor-pointer hover:border-gray-dark'>
              <img src={calendar.profile} alt={calendar.name} className='w-14 h-14 object-cover rounded-lg' />
              <p className='text-lg mt-2 font-semibold truncate'>{calendar.name}</p>
              <p className='text-muted-foreground text-sm font-medium'>
                {calendar.subscribers === 0 ? 'No subscribers' : `${calendar.subscribers} subscribers`}
              </p>
            </Card>
          ))
        )}
      </div>
    </>
  )
}

export default ViewCalendars
