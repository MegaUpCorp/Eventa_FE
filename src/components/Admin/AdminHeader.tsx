import React from 'react'
import { cn } from 'src/lib/utils'
import { Bell, Search, Menu, ExternalLink, Tickets, Heart, Settings, CircleArrowOutUpRight } from 'lucide-react'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { AuthDialog } from '../AuthDialog'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDynamicWidth } from 'src/hooks/useDynamicWidth'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useCheckPremium } from 'src/features/Users/CheckPremium/useCheckPremium'

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const navigate = useNavigate()
  const width = useDynamicWidth()
  const { pathname } = useLocation()
  const { isAuthenticated, logout, user } = useUserStore()
  const { data: isPremium } = useCheckPremium()
  return (
    <header className='flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <Button variant='ghost' size='icon' className='md:hidden' onClick={onMenuClick}>
        <Menu className='h-5 w-5' />
        <span className='sr-only'>Toggle menu</span>
      </Button>
      <div className='flex-1'>
        <h1 className='text-xl font-semibold'>Eventa Admin</h1>
      </div>
      <div className='hidden w-full max-w-sm md:flex'>
        <div className='relative w-full'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input type='search' placeholder='Search...' className='w-full pl-8' />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='relative'>
            <Bell className='h-5 w-5' />
            <span className='absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary'></span>
            <span className='sr-only'>Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New user registered</DropdownMenuItem>
          <DropdownMenuItem>New event created</DropdownMenuItem>
          <DropdownMenuItem>System update completed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
              <Avatar className={isPremium ? 'border-2 border-amber-500' : ''}>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-44 mt-2' align='end'>
              <DropdownMenuGroup>
                {/* <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/events/my-events')}>
                  <Tickets size={16} />
                  <p className='font-medium'>My Event</p>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/events/registered-events')}>
                  <Heart size={16} />
                  <p className='font-medium'>Registered Event</p>
                </DropdownMenuItem> */}
                <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/settings')}>
                  <Settings size={16} />
                  <p className='font-medium'>Settings</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer focus:text-[#ff0000]'
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                <CircleArrowOutUpRight size={16} />
                <p className='font-medium'>Log out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
}
