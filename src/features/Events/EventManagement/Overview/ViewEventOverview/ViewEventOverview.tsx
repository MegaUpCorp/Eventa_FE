import SendABlastDialog from '../../Blasts/SendABlast/SendABlastDialog'
import InviteGuestsDialog from '../../Guests/InviteGuests/InviteGuestsDialog'
import ShareEventDialog from '../ShareEvent/ShareEventDialog'
import AddHostDialog from '../AddHost/AddHostDialog'
import ChangeVisibilityDialog from '../ChangeVisibility/ChangeVisibilityDialog'
import EditEventSheet from '../EditEvent/EditEventSheet'
import {
  Calendar1,
  CalendarSync,
  Eye,
  Facebook,
  Globe,
  Linkedin,
  MailOpen,
  MapPinned,
  MessageSquareText,
  Plus,
  Twitter,
  UserRoundPen
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { useParams } from 'react-router-dom'
import { useViewEventDetail } from 'src/features/Events/ViewEvents/useViewEventDetail'
import { EventDetail } from 'src/@types/events.type'
import { format, isToday, isTomorrow, isYesterday } from 'date-fns'
import useOrganizer from './useViewOrganizer'
import { Organizer } from 'src/@types/organizer.type'

const ViewEventOverview = () => {
  const { slug } = useParams()
  const { data: response, isLoading } = useViewEventDetail(slug || '')
  const event = response?.data as EventDetail | undefined
  const formatDate = (date: string) => {
    return format(new Date(date), 'EEEE, MMM d')
  }

  const formatTime = (date: string) => {
    return format(new Date(date), 'h:mm a')
  }

  const getRelativeDay = (dateString: string) => {
    const eventDate = new Date(dateString)

    if (isToday(eventDate)) {
      return 'Today'
    } else if (isTomorrow(eventDate)) {
      return 'Tomorrow'
    } else if (isYesterday(eventDate)) {
      return 'Yesterday'
    }

    return format(eventDate, 'EEEE, MMM d')
  }

  const organizerId = event?.organizerId && event.organizerId.length > 0 ? event.organizerId[0] : undefined
  const { data: response2 } = useOrganizer(organizerId)
  const eventOrganizer = response2?.data.value as Organizer | undefined

  console.log("organizerId:", organizerId);
  console.log("eventOrganizer:", eventOrganizer);

  return (
    <div className='flex flex-col gap-6'>
      {/* Actions */}
      <div className='flex items-center gap-3'>
        <InviteGuestsDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#1355e434]'}>
                  <MailOpen size={24} className='text-primary' />
                </Badge>
                <p className='font-medium'>Invite Guests</p>
              </div>
            </Card>
          }
        />
        <SendABlastDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#ff26e223]'}>
                  <MessageSquareText size={24} className='text-pink' />
                </Badge>
                <p className='font-medium'>Send a Blast</p>
              </div>
            </Card>
          }
        />
        <ShareEventDialog className='w-full' />
      </div>
      {/* Event detail */}
      <Card className='p-4 grid grid-cols-2 gap-6'>
        <div className='col-span-1 space-y-4'>
          <img
            src={event?.profilePicture || 'https://blog.spoongraphics.co.uk/wp-content/uploads/2011/05/vibrant.jpg'} 
            alt='test'
            className='w-full rounded-lg'
          />
          <div className='flex items-center justify-between'>
            <p className='font-medium text-sm'>Share Event</p>
            <div className='flex items-center gap-4'>
              <Facebook size={16} />
              <Twitter size={16} />
              <Linkedin size={16} />
            </div>
          </div>
        </div>
        <div className='col-span-1 space-y-4 flex flex-col'>
          <p className='font-semibold text-xl'>When & Where</p>
          <div className='flex-1 space-y-4'>
            <div className='flex items-start gap-2'>
              <Badge className='p-2' variant='secondary'>
                <Calendar1 size={26} />
              </Badge>
              <div>
                <p className='font-medium'>{event ? getRelativeDay(event.startDate) : 'Date not available'}</p>
                <p className='text-sm text-muted-foreground font-medium'>
                  {event ? `${formatTime(event.startDate)} - ${formatTime(event.endDate)}` : 'Date not available'}
                </p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Badge className='p-2' variant='secondary'>
                <MapPinned size={26} />
              </Badge>
              {event?.location ? (
                <div>
                  <p className='font-medium'>{event.location.name}</p>
                  <p className='text-sm text-muted-foreground font-medium'>{event.location.address}</p>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Badge className='bg-[#f3c05b] p-2' variant='secondary'>
                    <MapPinned size={26} />
                  </Badge>
                  <p className='font-medium text-[#f3c05b]'>Location missing</p>
                  <p className='text-sm text-muted-foreground font-medium'>
                    Please enter the location of the event before it starts.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <EditEventSheet
              asChild
              trigger={
                <Button size='sm' className='w-full' variant='secondary'>
                  Edit Event
                </Button>
              }
            />
            <Button size='sm' className='w-full' variant='secondary'>
              Change Photo
            </Button>
          </div>
        </div>
      </Card>
      {/* Invites */}
      <div className='flex flex-col'>
        <div className='flex justify-between items-start mb-3'>
          <div>
            <p className='font-medium text-2xl'>Invites</p>
            <p className='text-muted-foreground'>Invite subscribers, contacts and past guests via email or SMS.</p>
          </div>
          <InviteGuestsDialog
            asChild
            trigger={
              <Button size='sm' variant='secondary'>
                <Plus />
                Invite Guests
              </Button>
            }
          />
        </div>
        <Card className='p-4 flex items-center gap-4'>
          <Badge className='p-2' variant='secondary'>
            <MailOpen size={32} />
          </Badge>
          <div>
            <p className='font-medium'>No Invites Sent</p>
            <p className='text-muted-foreground text-sm'>
              You can invite subscribers, contacts and past guests to the event.
            </p>
          </div>
        </Card>
      </div>
      <Separator className='my-2' />
      {/* Hosts */}
      <div>
        <div className='flex justify-between items-start mb-3'>
          <div>
            <p className='font-medium text-2xl'>Hosts</p>
            <p className='text-muted-foreground'>Add hosts, special guests, and event managers.</p>
          </div>
          <AddHostDialog
            asChild
            trigger={
              <Button size='sm' variant='secondary'>
                <Plus />
                Add Host
              </Button>
            }
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <Card className='p-4 flex items-center gap-4'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-2 text-sm'>
              <p className='font-medium'>{eventOrganizer?.organizerName}</p>
              <p className='text-muted-foreground'>{eventOrganizer?.organizerDescription}</p>
              <Badge className='bg-[#38ff4223] text-green'>Creator</Badge>
            </div>
            <UserRoundPen className='ml-auto text-muted-foreground' size={18} />
          </Card>
          <Card className='p-4 flex items-center gap-4'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-2 text-sm'>
              <p className='font-medium'>Mr Beast</p>
              <p className='text-muted-foreground'>demo@gmail.com</p>
            </div>
            <UserRoundPen className='ml-auto text-muted-foreground' size={18} />
          </Card>
        </div>
      </div>
      <Separator className='my-2' />
      {/* Visibility & Discovery */}
      <div>
        <div className='mb-3'>
          <p className='font-medium text-2xl'>Visibility & Discovery</p>
          <p className='text-muted-foreground'>Control how people can find your event.</p>
        </div>
        <Card className='p-4 flex items-start justify-start gap-4'>
          <img src='https://github.com/shadcn.png' alt='test' className='w-12 h-12 rounded-lg' />
          <div>
            <p className='font-medium text-sm text-muted-foreground'>Managing Calendar</p>
            <p className='font-medium'>Your Personal Calendar</p>
            <div className='flex items-center gap-1.5 font-medium text-sm my-2'>
              <Globe size={14} className='text-green' />
              <p className='text-green'>Public</p>
              <p>--- This event is listed on your profile page.</p>
            </div>
            <div className='flex items-center gap-2'>
              <ChangeVisibilityDialog
                visibility='private'
                asChild
                trigger={
                  <Button size='sm' variant='secondary'>
                    <Eye />
                    Change Visibility
                  </Button>
                }
              />
              <Button size='sm' variant='secondary'>
                <CalendarSync />
                Transfer Calendar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ViewEventOverview
