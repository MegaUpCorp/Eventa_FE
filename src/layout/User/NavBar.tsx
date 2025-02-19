import { Bell, CalendarDays, Compass, ExternalLink, Search, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthDialog } from 'src/components/AuthDialog'
import { ModeToggle } from 'src/components/ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { useUserStore } from 'src/config/zustand/UserStore'

const NavBar = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useUserStore()

  return (
    <div className='container-xl '>
      <div className='flex justify-start items-center py-4'>
        <div className='flex flex-row items-center w-1/2 h-10'>
          <div className=''>Logo</div>
          <div className='ml-[46px] flex items-center '>
            <Compass size={16} className='mr-1' />
            <p>Discover</p>
          </div>
          <div className='ml-[46px] flex items-center'>
            <Ticket size={16} className='mr-1' />
            <p>Events</p>
          </div>
          <div className='ml-[46px] flex items-center'>
            <CalendarDays size={16} className='mr-1' />
            <p>Calendar</p>
          </div>
        </div>
        <div className='flex items-center justify-end w-1/2 h-10'>
          <Button size='sm' className='mr-[20px] text-white' onClick={() => navigate('/events/create')}>
            Create Event
          </Button>
          <Bell size={16} className='mr-[20px]' />
          <Search size={16} className='mr-[20px]' />
          <div className='mr-[20px]'>
            {!isAuthenticated ? (
              <AuthDialog
                trigger={
                  <Button size='sm' className='text-white'>
                    <ExternalLink size={16} />
                    Join us now!
                  </Button>
                }
              />
            ) : (
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
export default NavBar
