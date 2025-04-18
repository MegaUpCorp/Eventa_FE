import FilterEventsDrawer from '../FilterEventsDrawer/FilterEventsDrawer'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useViewCalendarDetail } from '../ViewCalendarDetail/useViewCalendarDetail'
import { Button } from 'src/components/ui/button'
import { ArchiveRestore, PlusSquare, Search } from 'lucide-react'
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
import { format } from 'date-fns'
import { categorizeDate, EventCardTimeline } from '../ViewCalendarDetail/ViewCalendarDetail'

type TabState = 'upcoming' | 'past'

const ViewCalendarEvents = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabState>('upcoming')
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)
  const { publicUrl } = useParams()
  const { user } = useUserStore()
  const {
    '0': { data: calendarDetail, isLoading },
    '1': { data: calendarEvents }
  } = useViewCalendarDetail(publicUrl || '', undefined, undefined)

  if (!calendarDetail && !isLoading) return <Navigate to='/' />

  const filteredEvents = calendarEvents?.data.filter((x) => x?.startDate) || []

  const sortedEvents =
    tab === 'upcoming'
      ? filteredEvents.filter((event) => new Date(event.startDate) >= new Date())
      : filteredEvents.filter((event) => new Date(event.startDate) < new Date())

  const isEmpty = sortedEvents.length === 0

  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-2xl mb-2'>Events</p>
        <div className='flex items-center gap-2'>
          <Tabs defaultValue={tab} onValueChange={(value) => setTab(value as TabState)}>
            <TabsList>
              <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
              <TabsTrigger value='past'>Past</TabsTrigger>
            </TabsList>
          </Tabs>
          <FilterEventsDrawer
            filter={debouncedFilter}
            events={filteredEvents}
            setFilter={setFilter}
            asChild
            trigger={
              <Button variant='secondary' size='icon'>
                <Search />
              </Button>
            }
          />
        </div>
      </div>
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-2 mt-28 text-muted-foreground'>
          <ArchiveRestore size={70} />
          <p className='font-semibold text-2xl mt-2'>No Events</p>
          <p>{tab === 'upcoming' ? 'This calendar has no upcoming events.' : 'This calendar has no past events.'}</p>
          {calendarDetail?.accountId === user?.id && (
            <Button variant='secondary' className='mt-2' onClick={() => navigate('/events/create')}>
              <PlusSquare />
              Add Event
            </Button>
          )}
        </div>
      ) : (
        sortedEvents
          .sort((a, b) => b.startDate.localeCompare(a.startDate))
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
                          <EventCardTimeline key={event.id} event={event} accounts={timeline.account} />
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

export default ViewCalendarEvents
