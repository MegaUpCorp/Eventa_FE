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
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fd57501d5-4fea-4b28-9579-445f183a50e6%20(1).jpg?alt=media&token=0360f89e-571d-4466-830b-187ca2ad4da0'
              name='SuiHub Gaming Night: Official Launch of Merge Infinite'
              slug='suihub-gaming-night-official-launch-of-merge-infinite-528271567'
            />
          </div>
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2F31950428-64d4-4546-8e87-903c4c319503.jpg?alt=media&token=9f5cdfef-9933-4335-bf2c-7fe9f0019be3'
              name='Grand Opening: Mâm Mâm - Vietnamese Eatery & Lounge'
              slug='grand-opening-mam-mam-vietnamese-eatery-lounge-503002671'
            />
          </div>
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fa78143f8-c0d2-4655-87f9-10d5042a1e61.jpg?alt=media&token=ac818d97-f398-49e2-9fdd-1880a8ebccab'
              name='Build Buddies | Cafe meetup [Saigon]'
              slug='build-buddies-cafe-meetup-saigon-606940241'
            />
          </div>
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2F4dcd2806-afeb-4745-b9ad-7a08bb33d7b5.jpg?alt=media&token=7ff3e1c7-d1bd-40e0-bc58-f87aa85b4e66'
              name='BlockStar - HCMC Meetup'
              slug='blockstar-hcmc-meetup-191139745'
            />
          </div>
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2F96bad4de-fbcc-4d26-9f00-be2718a42d2a.jpg?alt=media&token=d433b464-02a9-4cc1-9ab5-854ea1d35c1a'
              name='💗 PLAYDATE: YÊU MỘT MIẾNG'
              slug='playdate-yeu-mot-mieng-850997390'
            />
          </div>
          <div className='col-span-6'>
            <DiscoverEventCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fd57501d5-4fea-4b28-9579-445f183a50e6%20(2).jpg?alt=media&token=5ba6946b-1548-48b2-94ef-01656109f00b'
              name='Exclusive Briefing: ARMENIA & VIETNAM In partnership.'
              slug='exclusive-briefing-armenia-vietnam-in-partnership-306862314'
            />
          </div>
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
          {/* <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fa78143f8-c0d2-4655-87f9-10d5042a1e61%20(1).jpg?alt=media&token=d762a63b-7c31-4547-85d6-c7a12501e501'
              description='Welcome to the official Luma page of the Starknet Foundation, where you can discover all our worldwide events.'
              name='The GenAI Collective'
            />
          </div> */}
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fimages.png?alt=media&token=950e3283-2e09-40f2-b9a7-772ded69d279'
              description='The career network for the next generation of women and non-binary leaders with inclusive in-person and virtual places to share stories, build relationships, and exchange knowledge.'
              name='Her Workplace'
              publicUrl='herworkplaceevents'
            />
          </div>
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2F5fy6MJQEZDytFtw6f6v33U.png?alt=media&token=8ee97cb9-944f-429b-9133-b5f97dfb45eb'
              description='Live a life full of creativity & connection. Join us for a club, project, workshop or private event in our communal Clinton Hill art studio.'
              name='RecCreate Collective'
              publicUrl='reccreatecollective'
            />
          </div>
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fimages%20(2).png?alt=media&token=3acfb648-a17e-4437-a040-4625c3f0da7a'
              description='The Canvas is a sustainable fashion platform with multiples stores and gallery spaces in New York City, representing over 100 brands and designers from over 40 countries.'
              name='The Canvas NYC'
              publicUrl='canvas-nyc'
            />
          </div>
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fimages%20(3).png?alt=media&token=68d6d912-5025-418e-844f-02b0bcacf4db'
              description='Welcome to the official Luma page of the Starknet Foundation, where you can discover all our worldwide events.'
              name='Starknet Foundation'
              publicUrl='starknetfndn'
            />
          </div>
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fimages.png?alt=media&token=b7ad2f24-6f80-4b74-bd37-c3bf18e169ca'
              description='Wu Wei Is a peaceful community space intensionally created to bring people together through community workshops and meaningful conversations...'
              name='Wu Wei Calendar'
              publicUrl='wuwei'
            />
          </div>
          <div className='col-span-4'>
            <DiscoverCalendarCard
              image='https://firebasestorage.googleapis.com/v0/b/ticket-resell-e100c.appspot.com/o/images%2Fimages.jfif?alt=media&token=7a0c97f8-a159-47e0-aac9-2aeb03b14a08'
              description="Welcome to our Luma calendar page! Subscribe here to be notified, find out details, and sign up for our upcoming events. We can't wait for you to join us and be a part of our community :)"
              name='City Girls Who Walk'
              publicUrl='citygirlswhowalk'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage

const DiscoverEventCard = ({ image, name, slug }: { image: string; name: string; slug: string }) => {
  return (
    <Link to={`/events/${slug}`} className='hover:border-gray-dark cursor-pointer'>
      <div className='flex items-center gap-4'>
        <img src={image} className='w-20 h-20 rounded-lg flex-shrink-0' />
        <div className='flex flex-col'>
          <p className='font-semibold text-base line-clamp-2 leading-tight'>{name}</p>
          <p className='font-medium text-sm line-clamp-1 text-muted-foreground'>Today, 6:00 PM</p>
          <p className='font-medium text-sm line-clamp-1 text-muted-foreground'>Tòa nhà Republic Plaza</p>
        </div>
      </div>
    </Link>
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

const DiscoverCalendarCard = ({
  image,
  name,
  description,
  publicUrl
}: {
  image: string
  name: string
  description: string
  publicUrl: string
}) => {
  return (
    <Link to={`/calendars/${publicUrl}`}>
      <Card className='p-4 space-y-2 hover:border-gray-dark cursor-pointer'>
        <div className='flex justify-between items-start'>
          <img src={image} className='w-14 h-14 rounded-lg' />
          <Button size='sm' variant='secondary'>
            Subscribe
          </Button>
        </div>
        <p className='font-medium text-lg'>{name}</p>
        <p className='line-clamp-2 text-muted-foreground text-sm'>{description}</p>
      </Card>
    </Link>
  )
}
