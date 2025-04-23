import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ArchiveRestore } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarEvent, CalendarEventItem } from 'src/@types/calendar.type'
import { Tabs, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from 'src/components/ui/timeline'
import { useUserStore } from 'src/config/zustand/UserStore'
import { categorizeDate, EventCardTimeline } from 'src/features/Calendars/ViewCalendarDetail/ViewCalendarDetail'
import http from 'src/utils/http'

type TabState = 'upcoming' | 'past'

const RegisteredEventPage = () => {
  const [tab, setTab] = useState<TabState>('upcoming')
  const { user } = useUserStore()
  const { data } = useQuery({
    queryKey: ['registered-events', user?.id],
    queryFn: async () => {
      const { data } = await http.get<CalendarEventItem[]>('participants/event-participated-me')
      return data
    }
  })

  const filteredEvents = data?.filter((x) => x?.startDate) || []

  const sortedEvents =
    tab === 'upcoming'
      ? filteredEvents.filter((event) => new Date(event.startDate) >= new Date())
      : filteredEvents.filter((event) => new Date(event.startDate) < new Date())

  const isEmpty = sortedEvents.length === 0

  const eventsMap = new Map<string, CalendarEventItem[]>()

  sortedEvents.forEach((event) => {
    const date = format(new Date(event.startDate), 'yyyy-MM-dd')
    if (!eventsMap.has(date)) {
      eventsMap.set(date, [])
    }
    eventsMap.get(date)?.push(event)
  })

  const eventsArray: CalendarEvent[] = Array.from(eventsMap.entries()).map(([date, events]) => ({
    startDate: date,
    account: [],
    events
  }))

  return (
    <div className='container-base p-4'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-2xl mb-4'>Registered Events</p>
        <div className='flex items-center gap-2'>
          <Tabs defaultValue={tab} onValueChange={(value) => setTab(value as TabState)}>
            <TabsList>
              <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
              <TabsTrigger value='past'>Past</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-2 mt-28 text-muted-foreground'>
          <ArchiveRestore size={70} />
          <p className='font-semibold text-2xl mt-2'>No Events</p>
          <p>{tab === 'upcoming' ? 'You have no upcoming registered events' : 'You have no past registered events'}</p>
        </div>
      ) : (
        eventsArray
          .sort((a, b) => a.startDate.localeCompare(b.startDate))
          .map((timeline) => {
            return (
              <Timeline key={timeline.startDate}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <TimelineTitle className='font-medium text-lg'>{categorizeDate(timeline.startDate)}</TimelineTitle>
                    <TimelineDescription className='font-medium'>
                      {format(timeline.startDate, 'EEEE, dd MMMM yyyy')}
                    </TimelineDescription>
                    <div className='flex flex-col gap-3 mt-4 space-y-2'>
                      {timeline.events
                        .sort((a, b) => b.startDate.localeCompare(a.startDate))
                        .map((event) => (
                          <Link key={event.id} to={`/events/${event.slug}`} className='w-full'>
                            <EventCardTimeline event={event} accounts={timeline.account} />
                          </Link>
                        ))}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            )
          })
      )}
    </div>
  )
}

export default RegisteredEventPage
