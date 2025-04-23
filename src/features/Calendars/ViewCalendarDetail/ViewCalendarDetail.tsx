import FilterEventsDrawer from '../FilterEventsDrawer/FilterEventsDrawer'
import SubscriptionButton from '../Subscription/SubscriptionButton'
import {
  addHours,
  addWeeks,
  endOfWeek,
  format,
  isToday,
  isTomorrow,
  isWithinInterval,
  isYesterday,
  parseISO,
  startOfWeek
} from 'date-fns'
import { ArchiveRestore, MapPin, Plus, PlusSquare, Search, Video } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CalendarEventAccount, CalendarEventItem } from 'src/@types/calendar.type'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Calendar } from 'src/components/ui/calendar'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useViewCalendarDetail } from './useViewCalendarDetail'
import { useDebounce } from 'use-debounce'

export const categorizeDate = (dateString: string): string => {
  const date = parseISO(dateString)
  const today = new Date()

  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  if (isYesterday(date)) return 'Yesterday'

  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 })

  if (isWithinInterval(date, { start: startOfThisWeek, end: endOfThisWeek })) {
    return 'This Week'
  }

  const startOfNextWeek = addWeeks(startOfThisWeek, 1)
  const endOfNextWeek = addWeeks(endOfThisWeek, 1)

  if (isWithinInterval(date, { start: startOfNextWeek, end: endOfNextWeek })) {
    return 'Next Week'
  }

  return format(date, 'dd MMM yyyy')
}

const users = [
  {
    username: 'Liam Wilson',
    role: 'Designer',
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDv4IypsNlDqKx5_XwdakAhV19hDBHjkWkwpyFoV8ZitZNKiG2ukUdBfSIvcnmkd1ChDo&usqp=CAU'
  },
  {
    username: 'Emma Davis',
    role: 'Developer',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt9UpcsobJNOGFHPeBt-88iRmqjflBnIjhw&s'
  },
  {
    username: 'Noah Brown',
    role: 'Manager',
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfki8qupAeZafWi7UTxzDOHPhtTyJ2AGghm6zF6sJjKVXxxac_gFEZ5nsHmghc31f54M&usqp=CAU'
  }
]

type TabState = 'upcoming' | 'past'

export const ViewCalendarDetail = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [tab, setTab] = useState<TabState>('upcoming')
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)
  const { publicUrl } = useParams()
  const {
    '0': { data: calendarDetail, isLoading },
    '1': { data: calendarEvents }
  } = useViewCalendarDetail(
    publicUrl || '',
    debouncedFilter ? debouncedFilter : undefined,
    date ? format(addHours(date, 7), 'yyyy-MM-dd') : undefined
  )

  if (!calendarDetail && !isLoading) return <Navigate to='/' />

  const filteredEvents = calendarEvents?.data.filter((x) => x?.startDate) || []

  const sortedEvents =
    tab === 'upcoming'
      ? filteredEvents.filter((event) => new Date(event.startDate) >= new Date())
      : filteredEvents.filter((event) => new Date(event.startDate) < new Date())

  const isEmpty = sortedEvents.length === 0

  if (calendarDetail?.accountId && user?.id && calendarDetail?.accountId === user?.id) {
    return <Navigate to={`/calendars/manage/${publicUrl}`} />
  }

  return (
    <>
      <div className='w-[1000px] h-72 mx-auto relative'>
        <img src={calendarDetail?.coverPicture} alt='nature' className='w-full h-full object-cover rounded-lg' />
        <div className='container-lg absolute -bottom-16 left-4 p-4 flex justify-between items-end'>
          <img
            src={calendarDetail?.profilePicture}
            alt='nature'
            className='w-28 h-28 object-cover rounded-2xl border-background border-8'
          />
          {user?.id !== calendarDetail?.accountId && (
            <SubscriptionButton
              isSubscribe={calendarDetail?.isSubscribe || false}
              publicUrl={calendarDetail?.publicUrl || ''}
            />
          )}
        </div>
      </div>
      <div className='container-lg px-4 space-y-2 mt-4'>
        <p className='text-4xl font-semibold mt-4'>{calendarDetail?.name}</p>
        <div className='flex items-center gap-2'>
          {calendarDetail?.location.name && (
            <>
              <MapPin size={18} className='text-muted-foreground' />
              <p className='font-medium'>{calendarDetail?.location.name}</p>
            </>
          )}
        </div>
        <p className='text-muted-foreground'>{calendarDetail?.description}</p>
      </div>
      <Separator />
      <div className='container-lg px-4 grid grid-cols-12 gap-8'>
        <div className='col-span-8 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-2xl'>Events</p>
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
              <p>
                {tab === 'upcoming' ? 'This calendar has no upcoming events.' : 'This calendar has no past events.'}
              </p>
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
                        <TimelineTitle className='font-medium text-lg'>
                          {categorizeDate(timeline.startDate)}
                        </TimelineTitle>
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
        <div className='col-span-4 space-y-4'>
          <Button className='w-full' variant='secondary'>
            <Plus />
            Submit Event
          </Button>
          <Card className='p-2 flex flex-col gap-2'>
            <Calendar mode='single' selected={date} onSelect={setDate} required={true} className='rounded-md border' />
            <Button variant='destructive' onClick={() => setDate(undefined)} disabled={!date}>
              Clear Selection
            </Button>
          </Card>
        </div>
      </div>
    </>
  )
}

export const EventCardTimeline = ({
  event,
  accounts
}: {
  event: CalendarEventItem
  accounts: CalendarEventAccount[]
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Card className='p-4 grid grid-cols-12 gap-3'>
      <div className='col-span-9 flex flex-col gap-2'>
        <p className='text-muted-foreground font-medium'>{format(parseISO(event.startDate), 'hh:mm a')}</p>
        <p className='text-xl font-medium'>{event.title}</p>
        <div className='flex items-center gap-3'>
          <TooltipProvider delayDuration={0}>
            <div className='flex -space-x-2 *:ring *:ring-background'>
              {users.map((user, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Avatar
                      className={`size-6 cursor-pointer transition-transform ${activeIndex === index ? 'z-10 scale-110' : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <AvatarImage src={user.profilePicture} alt={user.username} />
                      <AvatarFallback>
                        {user.username
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className='bg-accent glass'>
                    <p className='font-semibold text-base text-primary'>{user.username}</p>
                    {/* <p className='text-xs text-[#ffffff]'>{user.role}</p> */}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
          <p className='font-medium text-muted-foreground text-sm'>By Microsoft for Startups & Nathan Jordan</p>
        </div>
        {event.meetUrl && event.isOnline && (
          <div className='flex items-center gap-2 mt-2'>
            <Video className='text-muted-foreground' size={18} />
            <p className='font-medium text-muted-foreground'>Google Meet</p>
          </div>
        )}
        {event.location.id && (
          <div className='flex items-center gap-2'>
            <MapPin className='text-muted-foreground' size={18} />
            <p className='font-medium text-muted-foreground'>{event.location.name}</p>
          </div>
        )}
        <p className='mr-auto mt-2 text-green font-medium text-sm px-2 py-1 bg-[#5eff2827] rounded-lg'>
          {event.price && !event.isFree ? event.price : 'Free'}
        </p>
      </div>
      <div className='col-span-3'>
        <img src={event.profilePicture || ''} alt='event' className='w-full h-[120px] object-cover rounded-lg' />
      </div>
    </Card>
  )
}
