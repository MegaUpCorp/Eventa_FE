import ViewAccountSettings from 'src/features/Users/Settings/ViewAccountSettings'
import ViewPaymentSettings from 'src/features/Users/Settings/ViewPaymentSettings'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'

interface SettingsTab {
  id: number
  title: string
  value: Value
  content: React.ReactNode
}

type Value = 'account' | 'payment'

const SettingsPage = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const settingTabs: SettingsTab[] = [
    {
      id: 1,
      title: 'Account',
      value: 'account',
      content: <ViewAccountSettings />
    },
    {
      id: 2,
      title: 'Payment',
      value: 'payment',
      content: <ViewPaymentSettings />
    }
  ]

  let activeTab = settingTabs[0]

  const currentTab = pathname.split('/').pop() as Value

  switch (currentTab) {
    case 'account':
      activeTab = settingTabs[0]
      break
    case 'payment':
      activeTab = settingTabs[1]
      break
  }

  return (
    <div className='container-base p-4 mb-32'>
      <p className='text-3xl font-semibold mb-4'>Settings</p>
      <Tabs defaultValue={activeTab.value} className='relative mr-auto w-full'>
        <TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b-2 bg-transparent p-0'>
          {settingTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              onClick={() => navigate(`/settings/${tab.value}`)}
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

export default SettingsPage
