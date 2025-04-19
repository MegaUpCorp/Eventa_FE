import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Button } from 'src/components/ui/button'

const ViewCalendarNewsletters = () => {
  return (
    <div>
      <p className='font-semibold text-xl'>Drafts</p>
      <p className='text-muted-foreground mb-4'>
        As you write, your drafts will be automatically saved and appear here.
      </p>
      <div className='p-4 bg-yellow-600 bg-opacity-30 rounded-lg flex items-center'>
        <BadgeCheck className='text-yellow-400 mr-4' />
        <div className='flex flex-col items-start flex-1'>
          <p className='text-yellow-400 font-semibold'>Please verify your calendar</p>
          <p className='text-xs text-accent-foreground'>
            Share information about your calendar to send newsletters.lendar
          </p>
        </div>
        <Button variant='ghost'>
          Verify <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default ViewCalendarNewsletters
