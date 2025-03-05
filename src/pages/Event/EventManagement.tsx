import ViewEventOverview from 'src/features/Events/EventManagement/Overview/ViewEventOverview/ViewEventOverview'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'

interface EventTab {
  id: number
  title: string
  value: Value
  content: React.ReactNode
}

type Value = 'overview' | 'guests' | 'registration' | 'blasts' | 'insights' | 'more'

const eventTabs: EventTab[] = [
  {
    id: 1,
    title: 'Overview',
    value: 'overview',
    content: <ViewEventOverview />
  },
  {
    id: 2,
    title: 'Guests',
    value: 'guests',
    content: <div>Guests</div>
  },
  {
    id: 3,
    title: 'Registration',
    value: 'registration',
    content: <div>Registration</div>
  },
  {
    id: 4,
    title: 'Blasts',
    value: 'blasts',
    content: <div>Blasts</div>
  },
  {
    id: 5,
    title: 'Insights',
    value: 'insights',
    content: <div>Insights</div>
  },
  {
    id: 6,
    title: 'More',
    value: 'more',
    content: <div>More</div>
  }
]

const EventManagement = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { pathname } = useLocation()

  let activeTab = eventTabs[0]

  switch (pathname.split('/').pop() as Value) {
    case 'guests':
      activeTab = eventTabs[1]
      break
    case 'registration':
      activeTab = eventTabs[2]
      break
    case 'blasts':
      activeTab = eventTabs[3]
      break
    case 'insights':
      activeTab = eventTabs[4]
      break
    case 'more':
      activeTab = eventTabs[5]
      break
  }

  return (
    <div className='container-base p-4 mb-32'>
      <p className='text-3xl font-semibold mb-4'>Event Name</p>
      <Tabs defaultValue={activeTab.value} className='relative mr-auto w-full'>
        <TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b-2 bg-transparent p-0'>
          {eventTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              onClick={() => navigate(`/events/manage/${slug}/${tab.value}`)}
              className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 
                rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground 
                shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground 
                data-[state=active]:shadow-none'
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab.value}>{activeTab.content}</TabsContent>
      </Tabs>
    </div>
  )
}

export default EventManagement
