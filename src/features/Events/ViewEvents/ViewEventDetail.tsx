import { format } from 'date-fns'
import { CalendarDays, Earth, MapPin, Users2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { EventDetail } from 'src/@types/events.type'
import GoongMap from 'src/components/Goong/GoongMap'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card, CardContent } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { useViewEventDetail } from './useViewEventDetail'
import { useRegisterPaidEvent } from './useRegisterPaidEvent'
import { useRegisterFreeEvent } from './useRegisterFreeEvent'
import useOrganizer from '../EventManagement/Overview/ViewEventOverview/useViewOrganizer'
import { useUserStore } from 'src/config/zustand/UserStore'

export const ViewEventDetail = () => {
  const { slug } = useParams()
  const { user } = useUserStore()
  const navigate = useNavigate()
  const { data: response, isLoading } = useViewEventDetail(slug || '')
  const event = response?.data as EventDetail | undefined
  const { data: accountDetail } = useOrganizer(event?.organizerId[0] || '')
  const { mutateAsync: registerPaid } = useRegisterPaidEvent(event?.id || '')
  const { mutate: registerFree } = useRegisterFreeEvent(event?.id || '')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'EEEE, MMM d')
  }

  const formatTime = (date: string) => {
    return format(new Date(date), 'h:mm a')
  }

  const registerPaidEvent = async () => {
    const response = await registerPaid()
    localStorage.setItem('order-detail', JSON.stringify(response))
    navigate('/events/payment')
  }

  const registerEvent = async () => {
    registerFree()
  }

  const isPaidEvent = event.isFree === false && event.price > 0

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 p-4'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <Card className='rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-900/50 backdrop-blur-xl'>
          <CardContent className='p-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Left Column - Event Image */}
            <div className='md:col-span-1'>
              <div className='aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-lg'>
                <img
                  src={event.profilePicture || 'https://source.unsplash.com/800x600/?event'}
                  alt='Event Cover'
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                />
              </div>
              {/* Host Information */}
              <div className='space-y-4 mt-5'>
                <p className='font-medium text-muted-foreground'>Hosted By</p>
                <Separator className='my-4' />
                <div className='flex items-center gap-3'>
                  <Avatar className='border-2 border-white/10 w-12 h-12'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback className='bg-white/5'>ORG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium text-white'>Organizer</p>
                    <div className='flex items-center gap-1 text-sm text-gray-400'>
                      <Users2 size={14} />
                      <span className='text-muted-foreground'>{event.capacity} Capacity</span>
                    </div>
                  </div>
                </div>
                <Separator className='my-4' />

                <div className='flex -space-x-2'>
                  {[...Array(8)].map((_, i) => (
                    <Avatar key={i} className='border-2 border-gray-900 w-8 h-8'>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} />
                      <AvatarFallback className='bg-white/5'>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className='w-8 h-8 rounded-full bg-white/5 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400'>
                    +{Math.max(0, event.capacity - 8)}
                  </div>
                </div>
                <p className='text-muted-foreground'>Contact the Host</p>
                <p className='text-muted-foreground'>Report Event</p>
              </div>
            </div>

            {/* Right Column - Event Details */}
            <div className='md:col-span-2 space-y-4 text-white'>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full flex-row items-center gap-2'
                >
                  <Earth size={16} className='text-white' />
                  <p>{event.visibility === 'public' ? 'Public Event' : 'Private Event'}</p>
                </Badge>
                {event.isFree ? (
                  <Badge
                    variant='secondary'
                    className='bg-green-500/10 text-green-400 hover:bg-green-500/20 backdrop-blur-sm px-3 py-2 rounded-full'
                  >
                    Free
                  </Badge>
                ) : (
                  <Badge
                    variant='secondary'
                    className='bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 backdrop-blur-sm px-3 py-2 rounded-full'
                  >
                    ${event.price}
                  </Badge>
                )}
              </div>

              <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'>
                {event.title}
              </h1>

              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-gray-300'>
                  <div className='p-2 rounded-lg border bg-muted background-blur-xl'>
                    <CalendarDays size={20} className='text-gray-400' />
                  </div>
                  <div className='flex flex-col text-sm'>
                    <span>{formatDate(event.startDate)}</span>
                    <span>
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-gray-300'>
                  <div className='p-2 rounded-lg border bg-muted background-blur-xl'>
                    <MapPin size={20} className='text-gray-400' />
                  </div>
                  <div className='flex flex-col text-sm'>
                    <span>{event.location?.name}</span>
                    <span>{event.location?.address.replace(event.location?.name + ', ', '')}</span>
                  </div>
                </div>
              </div>

              {/* Registration Card */}
              {accountDetail?.data?.value?.accountId !== user?.id && (
                <div className='bg-white/5 backdrop-blur-md p-6 rounded-2xl space-y-3 border border-white/10'>
                  <h3 className='font-medium text-lg text-white'>Registration</h3>
                  <p className='text-sm text-gray-300'>
                    {event.requiresApproval
                      ? 'This event requires approval from the organizer to attend.'
                      : 'Welcome to the event! Please register below to join.'}
                  </p>

                  {isPaidEvent ? (
                    <Button size='sm' className='w-full text-[#FFFFF]' onClick={registerPaidEvent}>
                      Register
                    </Button>
                  ) : (
                    <Button size='sm' className='w-full text-[#FFFFF]' onClick={registerEvent}>
                      Register
                    </Button>
                  )}
                </div>
              )}

              {/* About Event */}
              <div className='space-y-2'>
                <h3 className='font-medium text-base'>About Event</h3>
                <Separator className='my-4' />
                <div
                  className='text-muted-foreground text-sm leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: event.description || '' }}
                />
              </div>

              {/* Location */}
              <div className='space-y-3'>
                <h3 className='font-medium text-base'>Location</h3>
                <Separator className='my-4' />
                <p className='text-blue-400 font-medium'>{event.location?.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {event.location?.address.replace(event.location.name + ', ', '')}
                </p>
                {event.location?.latitude && event.location?.longitude && (
                  <div className='rounded-2xl overflow-hidden relative border border-white/10'>
                    <GoongMap center={[event.location?.longitude, event.location?.latitude]} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
