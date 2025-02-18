import { Bell, CalendarDays, Compass, Search, Ticket } from 'lucide-react'
import { useContext } from 'react'
import { AuthDialog } from 'src/components/AuthDialog'
import { ModeToggle } from 'src/components/ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { AppContext } from 'src/context/app.context'
const NavBar = () => {
  const { isAuthenticated, setProfile, profile, setIsStaff } = useContext(AppContext)

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
          <Button size='sm' className='mr-[20px]'>
            Create Event
          </Button>
          <Bell size={16} className='mr-[20px]' />
          <Search size={16} className='mr-[20px]' />
          {isAuthenticated ? (
            <AuthDialog trigger={<Button size='sm'>Login</Button>} />
          ) : (
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
export default NavBar
