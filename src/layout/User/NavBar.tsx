import {
  Bell,
  CalendarDays,
  CircleArrowOutUpRight,
  CircleUserRound,
  Compass,
  ExternalLink,
  Search,
  Settings,
  Tickets
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthDialog } from 'src/components/AuthDialog'
import { ModeToggle } from 'src/components/ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useDynamicWidth } from 'src/hooks/useDynamicWidth'
import { cn } from 'src/lib/utils'

const navItems = [
  { label: 'Discover', path: '/discover', icon: Compass },
  { label: 'Events', path: '/events', icon: Tickets },
  { label: 'Calendars', path: '/calendars', icon: CalendarDays }
]

const NavBar = () => {
  const navigate = useNavigate()
  const width = useDynamicWidth()
  const { pathname } = useLocation()
  const { isAuthenticated, logout } = useUserStore()

  return (
    <nav className='relative z-10 flex items-center justify-between px-5 py-4 text-white mb-10'>
      <Link to='/' className='flex'>
        <p className='font-semibold'>eventa</p>
        <div className='w-[5px] h-[5px] bg-primary rounded-full ml-[3px] mt-[13px]' />
      </Link>

      <div
        className='absolute left-1/2 -translate-x-1/2 w-full flex justify-start items-center px-4 gap-8'
        style={{ width }}
      >
        {navItems.map(({ label, path, icon: Icon }) => (
          <Link key={path} to={path} className='flex items-start'>
            <Icon
              size={16}
              className={cn('mr-1', pathname.startsWith(path) ? 'text-white' : 'text-muted-foreground')}
            />
            <p
              className={cn('font-medium text-sm', pathname.startsWith(path) ? 'text-white' : 'text-muted-foreground')}
            >
              {label}
            </p>
          </Link>
        ))}
      </div>

      <div className='flex items-center gap-4'>
        <Button size='sm' className='text-white' onClick={() => navigate('/events/create')}>
          Create Event
        </Button>
        <Bell size={16} />
        <Search size={16} />
        <>
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44 mt-2' align='end'>
                <DropdownMenuGroup>
                  <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/me')}>
                    <CircleUserRound size={16} />
                    <p className='font-medium'>View Profile</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Settings size={16} />
                    <p className='font-medium'>Settings</p>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer focus:text-[#ff0000]' onClick={logout}>
                  <CircleArrowOutUpRight size={16} />
                  <p className='font-medium'>Log out</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavBar
