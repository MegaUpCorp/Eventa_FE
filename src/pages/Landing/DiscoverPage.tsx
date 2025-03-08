import { Accessibility, Bitcoin, Brain, Earth, HeartPulse, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'

const categories = [
  { id: 1, name: 'AI', icon: <Brain size={42} className='text-[#cf1391]' />, numOfEvents: '124' },
  { id: 2, name: 'Arts & Cultures', icon: <Palette size={42} className='text-[#71b913]' />, numOfEvents: '340' },
  { id: 3, name: 'Climate', icon: <Earth size={42} className='text-[#28c222]' />, numOfEvents: '20' },
  { id: 4, name: 'Fitness', icon: <Accessibility size={42} className='text-[#fc8a20]' />, numOfEvents: '150' },
  { id: 5, name: 'Wellness', icon: <HeartPulse size={42} className='text-[#1accbd]' />, numOfEvents: '723' },
  { id: 6, name: 'Crypto', icon: <Bitcoin size={42} className='text-[#b81dff]' />, numOfEvents: '76' }
]

const DiscoverPage = () => {
  return (
    <div className='container-base p-4'>
      <div className='space-y-2 mb-10'>
        <p className='text-3xl font-semibold'>Discover</p>
        <p className='text-muted-foreground'>
          Explore popular events near you, browse by category, or check out some of the great community calendars.
        </p>
      </div>
      <div>
        <p className='font-semibold text-xl'>Popular Events</p>
        <p className='font-medium text-xl text-muted-foreground mb-2'>Ho Chi Minh City</p>
        <div className='grid grid-cols-12 gap-4 mt-6'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='col-span-6'>
              <DiscoverEventCard />
            </div>
          ))}
        </div>
      </div>
      <Separator className='my-10' />
      <div>
        <p className='font-semibold text-xl'>Browse by Category</p>
        <div className='grid grid-cols-12 gap-4 mt-6'>
          {categories.map((category) => (
            <div key={category.id} className='col-span-4'>
              <DiscoverCategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
      <Separator className='my-10' />
      <div>
        <p className='font-semibold text-xl'>Featured Calendars</p>
        <div className='grid grid-cols-12 gap-4 mt-6'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((calendar) => (
            <div key={calendar} className='col-span-4'>
              <DiscoverCalendarCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage

const DiscoverEventCard = () => {
  return (
    <div className='flex items-center gap-4'>
      <img
        src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/az/9cba36d6-e07b-4e79-8d15-96aa43d12375.jpg'
        className='w-20 h-20 rounded-lg flex-shrink-0'
      />
      <div className='flex flex-col'>
        <p className='font-semibold text-base line-clamp-2 leading-tight'>
          Sui Vietnam Meetup: Deep Dive into Sui’s DeFi
        </p>
        <p className='font-medium text-sm line-clamp-1 text-muted-foreground'>Today, 6:00 PM</p>
        <p className='font-medium text-sm line-clamp-1 text-muted-foreground'>Tòa nhà Republic Plaza</p>
      </div>
    </div>
  )
}

const DiscoverCategoryCard = ({
  category
}: {
  category: {
    id: number
    name: string
    icon: JSX.Element
    numOfEvents: string
  }
}) => {
  return (
    <Card className='p-4 space-y-3 glass'>
      {category.icon}
      <div className='space-y-1'>
        <p className='text-lg font-medium'>{category.name}</p>
        <p className='text-muted-foreground font-medium'>{category.numOfEvents} events</p>
      </div>
    </Card>
  )
}

const DiscoverCalendarCard = () => {
  return (
    <Link to='/calendars/test'>
      <Card className='p-4 space-y-2 hover:border-gray-dark cursor-pointer'>
        <div className='flex justify-between items-start'>
          <img
            src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/3t/000d073f-782e-4801-9f5d-c2e44bc96ff6.jpg'
            className='w-14 h-14 rounded-lg'
          />
          <Button size='sm' variant='secondary'>
            Subscribe
          </Button>
        </div>
        <p className='font-medium text-lg'>Build Club</p>
        {/* <div className='flex items-center gap-1'>
          <MapPin size={14} className='text-muted-foreground flex-shrink-0' />
          <p className='text-sm'>Sydney</p>
        </div> */}
        <p className='line-clamp-2 text-muted-foreground text-sm'>
          SXSW (South by Southwest) is an annual festival in Austin, Texas, blending music, film, interactive media, and
          tech. March 7 - 15, 2025. Unofficial side event calendar.
        </p>
      </Card>
    </Link>
  )
}
