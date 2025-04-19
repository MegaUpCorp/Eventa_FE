import ViewCalendarEvents from 'src/features/Calendars/CalendarManagement/ViewCalendarEvents'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { useViewCalendarDetail } from 'src/features/Calendars/ViewCalendarDetail/useViewCalendarDetail'
import ViewCalendarNewsletters from 'src/features/Calendars/CalendarManagement/ViewCalendarNewsletters'
import ViewCalendarInsights from 'src/features/Calendars/CalendarManagement/ViewCalendarInsights'

interface CalendarTab {
  id: number
  title: string
  value: Value
  content: React.ReactNode
}

type Value = 'events' | 'newsletters' | 'insights' | 'settings'

const CalendarManagement = () => {
  const navigate = useNavigate()
  const { publicUrl } = useParams()
  const {
    '0': { data: calendarDetail }
  } = useViewCalendarDetail(publicUrl || '')

  const { pathname } = useLocation()

  const calendarTabs: CalendarTab[] = [
    {
      id: 1,
      title: 'Events',
      value: 'events',
      content: <ViewCalendarEvents />
    },
    {
      id: 3,
      title: 'Newsletters',
      value: 'newsletters',
      content: <ViewCalendarNewsletters />
    },
    {
      id: 4,
      title: 'Insights',
      value: 'insights',
      content: <ViewCalendarInsights />
    }
  ]

  let activeTab = calendarTabs[0]

  const currentTab = pathname.split('/').pop() as Value

  switch (currentTab) {
    case 'events':
      activeTab = calendarTabs[0]
      break
    case 'newsletters':
      activeTab = calendarTabs[1]
      break
    case 'insights':
      activeTab = calendarTabs[2]
      break
  }

  return (
    <div className='container-lg p-4 mb-32'>
      <p className='text-3xl font-semibold mb-4'>{calendarDetail?.name}</p>
      <Tabs defaultValue={activeTab.value} className='relative mr-auto w-full'>
        <TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b-2 bg-transparent p-0'>
          {calendarTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              onClick={() => navigate(`/calendars/manage/${publicUrl}/${tab.value}`)}
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
        <TabsContent value={activeTab.value} className='mt-6'>
          {activeTab.content}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CalendarManagement
