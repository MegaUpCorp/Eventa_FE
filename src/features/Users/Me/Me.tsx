import { CalendarDays } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Separator } from 'src/components/ui/separator'

const Me = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-start gap-8'>
        <Avatar className='w-28 h-28'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold text-2xl'>Account VIP</p>
          <div className='flex items-center gap-2'>
            <CalendarDays size={18} className='text-muted-foreground' />
            <p className='text-muted-foreground font-medium'>Joined February 2025</p>
          </div>
          <div className='flex items-center gap-4'>
            <p className='font-medium'>
              32 <span className='text-muted-foreground'>Hosted</span>
            </p>
            <p className='font-medium'>
              942 <span className='text-muted-foreground'>Attended</span>
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <p className='text-xl font-medium'>Past Events</p>
    </div>
  )
}

export default Me
