import { useQueryClient } from '@tanstack/react-query'
import { CheckCheck, ClipboardCheck, FileDigit, MailOpen, QrCode, ScrollText } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { Progress } from 'src/components/ui/progress'
import { Separator } from 'src/components/ui/separator'
import { useCheckInEvent } from 'src/features/Events/ViewEvents/useCheckInEvent'
import { cn } from 'src/lib/utils'
import CheckInGuestsDialog from '../CheckInGuests/CheckInGuestsDialog'
import InviteGuestsDialog from '../InviteGuests/InviteGuestsDialog'
import ToggleGuestListDialog from '../ToggleGuestList/ToggleGuestListDialog'
import { useViewEventGuests } from './useViewEventGuests'

interface ViewEventGuestsProps {
  capacity: number
  eventId: string
}

const ViewEventGuests = ({ capacity, eventId }: ViewEventGuestsProps) => {
  const { data } = useViewEventGuests()
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const [checkInCode, setCheckInCode] = useState('')

  const { mutateAsync, isPending } = useCheckInEvent(eventId)

  const handleCheckIn = async (participantId: string, code: string) => {
    mutateAsync({ eventId, uniqueCode: code, participantId }).then(() => {
      setCheckInCode('')
      queryClient.invalidateQueries({ queryKey: ['getEventGuestsList', slug] })
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='font-semibold text-xl'>At a Glance</p>
      <div className='space-y-2'>
        <p className='text-muted-foreground text-xl'>{data?.length} guests</p>
        <Progress value={Math.ceil(data?.length || 0 / capacity)} />
      </div>
      <div className='flex items-center gap-3 my-3'>
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
        <CheckInGuestsDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#38ff4223]'}>
                  <QrCode size={24} className='text-green' />
                </Badge>
                <p className='font-medium'>Check In Guests</p>
              </div>
            </Card>
          }
        />
        <ToggleGuestListDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#ffff361f]'}>
                  <ScrollText size={24} className='text-yellow' />
                </Badge>
                <div className='flex flex-col items-start'>
                  <p className='font-medium'>Guest List</p>
                  <p className='text-xs text-muted-foreground'>Shown to guests</p>
                </div>
              </div>
            </Card>
          }
        />
      </div>
      <Separator />
      <p className='font-semibold text-xl'>Guest List</p>
      {data?.map((guest) => (
        <Card key={guest.id} className='p-2.5 flex items-center gap-2'>
          <Avatar className={cn('size-9 border-2', guest.isCheckin ? 'border-emerald-500' : 'border-gray')}>
            <AvatarImage src={guest.profilePicture} />
            <AvatarFallback>{guest.email}</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-medium text-sm'>{guest.fullName}</p>
            <p className='text-muted-foreground text-xs'>{guest.email}</p>
          </div>
          {guest.isCheckin ? (
            <CheckCheck className='text-emerald-500 ml-auto mr-2' />
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className='ml-auto text-white' size='icon'>
                  <ClipboardCheck />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px] [&>button]:hidden'>
                <DialogHeader>
                  <DialogTitle>
                    Check in for <span className='text-primary'>{guest.fullName}</span>
                  </DialogTitle>
                  <DialogDescription>Enter the unique code of this user in order to check in</DialogDescription>
                </DialogHeader>
                <Input
                  placeholder='Code'
                  StartIcon={FileDigit}
                  autoFocus
                  value={checkInCode}
                  onChange={(e) => setCheckInCode(e.target.value)}
                />
                <DialogFooter>
                  <Button
                    type='submit'
                    className='text-white'
                    disabled={!checkInCode || checkInCode.length < 6}
                    onClick={() => handleCheckIn(guest.participantId, checkInCode)}
                    isLoading={isPending}
                  >
                    Check In
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </Card>
      ))}
    </div>
  )
}

export default ViewEventGuests
