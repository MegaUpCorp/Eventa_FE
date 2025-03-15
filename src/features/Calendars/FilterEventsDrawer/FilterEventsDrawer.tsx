import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Search } from 'lucide-react'
import { CalendarEvent } from 'src/@types/calendar.type'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from 'src/components/ui/drawer'
import { Input } from 'src/components/ui/input'
import { EventCardTimeline } from '../ViewCalendarDetail/ViewCalendarDetail'
import { ScrollArea } from 'src/components/ui/scroll-area'

interface FilterEventsDrawerProps {
  trigger: React.ReactNode
  asChild?: boolean
  filter: string
  setFilter: (filter: string) => void
  events: CalendarEvent[]
}

const FilterEventsDrawer = ({ trigger, asChild = false, setFilter, filter, events }: FilterEventsDrawerProps) => {
  return (
    <Drawer onClose={() => setFilter('')}>
      <DrawerTrigger asChild={asChild}>{trigger}</DrawerTrigger>
      <DrawerContent className='h-screen'>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>...</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>
        <div className='flex flex-col container-xs mt-10'>
          <Input
            StartIcon={Search}
            placeholder='Search for events'
            autoFocus
            spellCheck={false}
            className='h-12'
            onChange={(e) => setFilter(e.target.value)}
          />
          <ScrollArea className='h-[800px] mt-4'>
            {filter
              ? events
                  .sort((a, b) => b.startDate.localeCompare(a.startDate))
                  .map((event) => (
                    <div className='flex flex-col gap-3 mt-4 space-y-2 mr-3.5' key={event.startDate}>
                      {event.events
                        .sort((a, b) => b.startDate.localeCompare(a.startDate))
                        .map((item) => (
                          <EventCardTimeline key={item.id} event={item} accounts={event.account} />
                        ))}
                    </div>
                  ))
              : null}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterEventsDrawer
