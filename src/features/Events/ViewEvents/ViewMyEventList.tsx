import React from 'react'
import moment from 'moment'
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { Img } from 'src/components'
import { Timeline, TimelineConnector, TimelineDot, TimelineItem, TimelineSeparator } from 'src/components/ui/timeline'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

export interface EventListProps {
  calendarId: string
  capacity: number
  delFlg: boolean
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  time_start: string
  time_end: string
  location?: { name: string }
  guests?: number
  imgage?: string
  isFree?: boolean
  isOnline?: boolean
  price?: number
  profilePicture?: string
  slug?: string
  visibility?: string
}
const eventData: EventListProps[] = [
  {
    id: '1',
    title: "GOOGLE'S INNOVATION SYMPOSIUM",
    startDate: '2025-02-28',
    endDate: '2025-02-28',
    calendarId: '1',
    capacity: 100,
    delFlg: false,
    time_start: '07:00 AM',
    time_end: '09:00 AM',
    location: { name: 'Location Missing' },
    guests: 0,
    isFree: true,
    isOnline: false,
    price: 0,
    profilePicture:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    slug: 'google-innovation-symposium',
    visibility: 'public',
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  },
  {
    id: '2',
    title: "BOOK REVIEW - WHAT'S YOUR STORY?",
    startDate: '2025-02-02',
    endDate: '2025-02-02',
    calendarId: '1',
    capacity: 100,
    delFlg: false,
    time_start: '09:00 AM',
    time_end: '11:00 AM',
    location: { name: 'Location Missing' },
    guests: 200,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    isFree: true,
    isOnline: false,
    price: 0,
    profilePicture:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    slug: 'book-review-whats-your-story',
    visibility: 'public'
  },
  {
    id: '3',
    title: 'CONTENT CREATION MASTERCLASS',
    startDate: '2025-02-02',
    endDate: '2025-02-02',
    calendarId: '1',
    capacity: 100,
    delFlg: false,
    time_start: '07:00 AM',
    time_end: '09:00 AM',
    location: { name: 'Location Missing' },
    guests: 0,
    isFree: true,
    isOnline: false,
    price: 0,
    profilePicture:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    slug: 'content-creation-masterclass',
    visibility: 'public',
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  },
  {
    id: '4',
    title: "FPT'S TECHNOLOGY SHOWCASE EXPO",
    startDate: '2025-02-02',
    endDate: '2025-02-02',
    calendarId: '1',
    capacity: 100,
    delFlg: false,
    time_start: '09:00 AM',
    time_end: '11:00 AM',
    location: { name: 'Location Missing' },
    guests: 400,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    isFree: true,
    isOnline: false,
    price: 0,
    profilePicture:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin',
    slug: 'fpts-technology-showcase-expo',
    visibility: 'public'
  }
]

const groupEventsByDate = (events: EventListProps[]) => {
  const grouped: { [key: string]: EventListProps[] } = {}
  events.forEach((event) => {
    if (!grouped[event.startDate]) {
      grouped[event.startDate] = []
    }
    grouped[event.startDate].push(event)
  })
  return grouped
}

const ViewMyEventList: React.FC<{ eventData: EventListProps[] }> = ({ eventData }) => {
  const navigate = useNavigate()
  const now = moment()
  const upcomingEvents = eventData.filter((event) => moment(event.startDate).isSameOrAfter(now, 'day'))
  const pastEvents = eventData.filter((event) => moment(event.startDate).isBefore(now, 'day'))
  const groupedUpcomingEvents = groupEventsByDate(upcomingEvents)
  const groupedPastEvents = groupEventsByDate(pastEvents)

  const handleEventClick = (slug: string) => {
    navigate(`/events/manage/${slug}`)
  }

  return (
    <div className='container-base p-4 mx-auto text-white'>
      <Tabs defaultValue='upcoming'>
        <div className='flex flex-row justify-between items-center mb-6'>
          <h2 className='text-3xl font-semibold mb-4'>Events</h2>
          <TabsList>
            <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
            <TabsTrigger value='past'>Past</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='upcoming'>
          {Object.keys(groupedUpcomingEvents).map((date) => (
            <div key={date} className='flex mb-6'>
              <div className='w-1/5 mt-2'>
                <h3 className='text-lg font-semibold '>{moment(date).format('MMM D')}</h3>
                <h2 className='text-sm font-thin text-muted-foreground'>{moment(date).format('dddd')}</h2>
              </div>

              <div className='w-4/5 mt-2 space-y-4'>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <div className='ml-10 flex flex-col gap-3 mt-4 space-y-2 w-full'>
                      {groupedUpcomingEvents[date].map((event) => (
                        <Card
                          key={event.id}
                          className='bg-black flex flex-row justify-between text-white border border-gray-700 hover:bg-gray-900 transition-colors cursor-pointer'
                          onClick={() => event.slug && handleEventClick(event.slug)}
                        >
                          <CardContent className='p-4 flex flex-col items-start'>
                            <p className='text-sm text-gray-400'>{event.time_start}</p>
                            <CardTitle className='text-lg font-bold mt-1'>{event.title}</CardTitle>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                              <MapPinIcon size={18} /> {event.location?.name || 'Location Missing'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <UsersIcon size={18} /> {event.guests || 'No Guests'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <Button size='sm' onClick={() => event.slug && handleEventClick(event.slug)}>
                                Management Event
                              </Button>
                            </div>
                          </CardContent>
                          <CardContent className='p-4 flex justify-end'>
                            <img src={event?.profilePicture} alt='' className='w-32 h-32 object-cover rounded-lg' />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='past'>
          {Object.keys(groupedPastEvents).map((date) => (
            <div key={date} className='flex mb-6'>
              <div className='w-1/5 mt-2'>
                <h3 className='text-lg font-semibold '>{moment(date).format('MMM D')}</h3>
                <h2 className='text-sm font-thin text-muted-foreground'>{moment(date).format('dddd')}</h2>
              </div>
              <div className='w-4/5 mt-2 space-y-4'>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <div className='ml-10 flex flex-col gap-3 mt-4 space-y-2 w-full'>
                      {groupedPastEvents[date].map((event) => (
                        <Card
                          key={event.id}
                          className='bg-black flex flex-row justify-between text-white border border-gray-700 hover:bg-gray-900 transition-colors cursor-pointer'
                          onClick={() => event.slug && handleEventClick(event.slug)}
                        >
                          <CardContent className='p-4 flex flex-col items-start'>
                            <p className='text-sm text-gray-400'>{event.time_start}</p>
                            <CardTitle className='text-lg font-bold mt-1'>{event.title}</CardTitle>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                              <MapPinIcon size={18} /> {event.location?.name || 'Location Missing'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <UsersIcon size={18} /> {event.guests || 'No Guests'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <Button size='sm' onClick={() => event.slug && handleEventClick(event.slug)}>
                                Management Event
                              </Button>
                            </div>
                          </CardContent>
                          <CardContent className='p-4 flex justify-end'>
                            <img src={event.profilePicture} alt='' className='w-32 h-32 object-cover rounded-lg' />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ViewMyEventList
