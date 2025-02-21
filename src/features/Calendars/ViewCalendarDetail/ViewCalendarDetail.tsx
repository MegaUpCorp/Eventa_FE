import { format } from 'date-fns'
import { FileText, List, MapPin, Plus, Search, Video } from 'lucide-react'
import { useState } from 'react'
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

const users = [
  {
    name: 'Liam Wilson',
    role: 'Designer',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDv4IypsNlDqKx5_XwdakAhV19hDBHjkWkwpyFoV8ZitZNKiG2ukUdBfSIvcnmkd1ChDo&usqp=CAU'
  },
  {
    name: 'Emma Davis',
    role: 'Developer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt9UpcsobJNOGFHPeBt-88iRmqjflBnIjhw&s'
  },
  {
    name: 'Noah Brown',
    role: 'Manager',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfki8qupAeZafWi7UTxzDOHPhtTyJ2AGghm6zF6sJjKVXxxac_gFEZ5nsHmghc31f54M&usqp=CAU'
  }
]

export const ViewCalendarDetail = () => {
  return (
    <>
      <div className='w-[1000px] h-72 mx-auto relative'>
        <img
          src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,anim=false,background=white,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/8h/7620f825-1290-449c-898b-0a731ae4ca15'
          alt='nature'
          className='w-full h-full object-cover rounded-lg'
        />
        <div className='container-lg absolute -bottom-16 left-4 p-4 flex justify-between items-end'>
          <img
            src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,anim=false,background=white,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/8h/7620f825-1290-449c-898b-0a731ae4ca15'
            alt='nature'
            className='w-28 h-28 object-cover rounded-2xl border-background border-8'
          />
          <Button className='text-[#ffffff]'>Subscribe</Button>
        </div>
      </div>
      <div className='container-lg px-4 space-y-2 mt-4'>
        <p className='text-4xl font-semibold mt-4'>Generative AI San Francisco and Bay Area</p>
        <div className='flex items-center gap-2'>
          <MapPin size={18} className='text-muted-foreground' />
          <p className='font-medium'>Ho Chi Minh City</p>
        </div>
        <p className='text-muted-foreground'>
          GenerativeAISF.com In-person AI events 📤 Subscribe for a weekly events email ✍️ AI newsletter
          www.aitidbits.ai 🗓️ Submit an event or ping me on X/LinkedIn
        </p>
      </div>
      <Separator />
      <div className='container-lg px-4 grid grid-cols-12 gap-8'>
        <div className='col-span-8 space-y-4'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-2xl'>Events</p>
            <div className='flex items-center gap-2'>
              <Tabs defaultValue='card'>
                <TabsList>
                  <TabsTrigger value='card'>
                    <FileText size={14} className='mr-2' />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value='list'>
                    <List size={14} className='mr-2' />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant='secondary' size='icon'>
                <Search />
              </Button>
            </div>
          </div>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <EventTimeline />
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <EventTimeline />
            </TimelineItem>
          </Timeline>
        </div>
        <div className='col-span-4 space-y-4'>
          <Button className='w-full' variant='secondary'>
            <Plus />
            Submit Event
          </Button>
          <Card className='p-2'>
            <Calendar />
          </Card>
        </div>
      </div>
    </>
  )
}

const EventTimeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <TimelineContent>
      <TimelineTitle className='font-medium text-lg'>Today</TimelineTitle>
      <TimelineDescription className='font-medium'>{format(new Date(), 'EEEE, dd MMMM yyyy')}</TimelineDescription>
      <div className='flex flex-col gap-3 mt-4 space-y-2'>
        {[1, 2, 3].map((item) => (
          <Card className='p-4 grid grid-cols-12 gap-3' key={item}>
            <div className='col-span-9 flex flex-col gap-2'>
              <p className='text-muted-foreground font-medium'>10:00 AM</p>
              <p className='text-xl font-medium'>🧠 GenAI Collective 🧠 Marin AI Investors Roundtable</p>
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
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent className='bg-accent glass'>
                          <p className='font-semibold text-base text-primary'>{user.name}</p>
                          <p className='text-xs text-[#ffffff]'>{user.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
                <p className='font-medium text-muted-foreground text-sm'>By Microsoft for Startups & Nathan Jordan</p>
              </div>
              <p className='mr-auto mt-2 text-green font-medium text-sm px-2 py-1 bg-[#5eff2827] rounded-lg'>
                300.000 VND
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <Video className='text-muted-foreground' size={18} />
                <p className='font-medium text-muted-foreground'>Google Meet</p>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='text-muted-foreground' size={18} />
                <p className='font-medium text-muted-foreground'>District 1, Ho Chi Minh City</p>
              </div>
            </div>
            <div className='col-span-3'>
              <img
                src='https://rubee.com.vn/wp-content/uploads/2021/06/logo-cua-microsoft.png'
                alt='event'
                className='w-full h-[120px] object-cover rounded-lg'
              />
            </div>
          </Card>
        ))}
      </div>
    </TimelineContent>
  )
}
