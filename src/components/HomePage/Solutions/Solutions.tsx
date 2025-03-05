import { CalendarCog, ChartNoAxesCombined, Landmark, ThumbsUp, Tickets } from 'lucide-react'
import { Card } from 'src/components/ui/card'
import { cn } from 'src/lib/utils'

const SOLUTION_ITEMS = [
  {
    id: 1,
    label: 'Event Management',
    description: 'Create event pages, manage RSVPs, and send reminders.',
    icon: <Tickets className='text-pink' size={32} />,
    color: 'bg-[#ff26e223]'
  },
  {
    id: 2,
    label: 'Data chart',
    description: 'Track attendee engagement with live charts and insights.',
    icon: <ChartNoAxesCombined className='text-orange' size={32} />,
    color: 'bg-[#ff592723]'
  },
  {
    id: 3,
    label: 'Calendars',
    description: 'Host recurring events, and manage memberships.',
    icon: <CalendarCog className='text-yellow' size={32} />,
    color: 'bg-[#ffff361f]'
  },
  {
    id: 4,
    label: 'Monetization',
    description: 'Charge for events, subscriptions, and more.',
    icon: <Landmark className='text-green' size={32} />,
    color: 'bg-[#38ff4223]'
  }
]

export const Solutions = () => {
  return (
    <>
      <div className='mt-24 mb-5 text-primary mx-auto flex justify-center items-center gap-2 bg-primary-foreground py-2 px-4 rounded-lg'>
        <ThumbsUp size={18} />
        <p className='font-medium text-sm'>Your Best Event Management Platform</p>
      </div>
      <div className='text-center'>
        <p className='text-4xl font-semibold mb-1'>Our Solution For Your Business</p>
        <p className='text-sm text-muted-foreground'>
          Bring your plan to reality. We give the resources and support you need to make your event truly distinctive.
        </p>
        <p className='text-sm text-muted-foreground'>Let&apos;s plan your own event!</p>
      </div>
      <div className='grid grid-cols-4 gap-4 mt-14 mb-10'>
        {SOLUTION_ITEMS.map((item) => (
          <Card key={item.id} className='glass p-4 w-full min-h-48 flex flex-col hover:border-gray-dark cursor-pointer'>
            <div className={cn(`p-3 rounded-md mr-auto`, item.color)}>{item.icon}</div>
            <p className='font-medium text-xl my-2'>{item.label}</p>
            <p className='text-muted-foreground text-sm'>{item.description}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
