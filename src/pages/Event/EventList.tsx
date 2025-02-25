import React from 'react'
import moment from 'moment'
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { Img } from 'src/components'
import { Timeline, TimelineConnector, TimelineDot, TimelineItem, TimelineSeparator } from 'src/components/ui/timeline'

interface EventListProps {
  id: string
  title: string
  description?: string
  start_date: string
  time_start: string
  time_end: string
  location?: string
  guests?: number
  imgage?: string
}

const eventData: EventListProps[] = [
  {
    id: '1',
    title: "GOOGLE'S INNOVATION SYMPOSIUM",
    start_date: '2025-02-28',
    time_start: '07:00 AM',
    time_end: '09:00 AM',
    location: 'Location Missing',
    guests: 0,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  },
  {
    id: '2',
    title: 'BOOK REVIEW – WHAT’S YOUR STORY?',
    start_date: '2025-02-01',
    time_start: '09:00 AM',
    time_end: '11:00 AM',
    location: 'FPT University HCMC',
    guests: 200,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  },
  {
    id: '3',
    title: 'CONTENT CREATION MASTERCLASS',
    start_date: '2025-02-02',
    time_start: '07:00 AM',
    time_end: '09:00 AM',
    location: 'Location Missing',
    guests: 0,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  },
  {
    id: '4',
    title: 'FPT’S TECHNOLOGY SHOWCASE EXPO',
    start_date: '2025-02-02',
    time_start: '09:00 AM',
    time_end: '11:00 AM',
    location: 'FPT University HCMC',
    guests: 400,
    imgage:
      'https://cloud.appwrite.io/v1/storage/buckets/67bc7909001dae69bd46/files/67bd996a002857eac7e0/view?project=67bc78cb002225a750d4&mode=admin'
  }
]

const groupEventsByDate = (events: EventListProps[]) => {
  const grouped: { [key: string]: EventListProps[] } = {}
  events.forEach((event) => {
    if (!grouped[event.start_date]) {
      grouped[event.start_date] = []
    }
    grouped[event.start_date].push(event)
  })
  return grouped
}

const EventList: React.FC = () => {
  const now = moment()
  const upcomingEvents = eventData.filter((event) => moment(event.start_date).isSameOrAfter(now, 'day'))
  const pastEvents = eventData.filter((event) => moment(event.start_date).isBefore(now, 'day'))

  const groupedUpcomingEvents = groupEventsByDate(upcomingEvents)
  const groupedPastEvents = groupEventsByDate(pastEvents)

  return (
    <div className='container-lg p-4 mx-auto text-white'>
      <Tabs defaultValue='upcoming'>
        <div className='flex flex-row justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Events</h2>
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
                          className=' bg-black flex flex-row justify-between text-white border border-gray-700'
                        >
                          <CardContent className='p-4 flex flex-col items-start'>
                            <p className='text-sm text-gray-400'>{event.time_start}</p>
                            <CardTitle className='text-lg font-bold mt-1'>{event.title}</CardTitle>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                              <MapPinIcon size={18} /> {event.location || 'Location Missing'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <UsersIcon size={18} /> {event.guests || 'No Guests'}
                            </div>
                          </CardContent>
                          <CardContent className='p-4 flex justify-end'>
                            <img src={event.imgage} alt='' className='w-32 h-32 object-cover rounded-lg' />
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
                          className=' bg-black flex flex-row justify-between text-white border border-gray-700'
                        >
                          <CardContent className='p-4 flex flex-col items-start'>
                            <p className='text-sm text-gray-400'>{event.time_start}</p>
                            <CardTitle className='text-lg font-bold mt-1'>{event.title}</CardTitle>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                              <MapPinIcon size={18} /> {event.location || 'Location Missing'}
                            </div>
                            <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                              <UsersIcon size={18} /> {event.guests || 'No Guests'}
                            </div>
                          </CardContent>
                          <CardContent className='p-4 flex justify-end'>
                            <img src={event.imgage} alt='' className='w-32 h-32 object-cover rounded-lg' />
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

export default EventList
