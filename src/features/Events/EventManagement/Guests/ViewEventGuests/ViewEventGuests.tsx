import CheckInGuestsDialog from '../CheckInGuests/CheckInGuestsDialog'
import InviteGuestsDialog from '../InviteGuests/InviteGuestsDialog'
import ToggleGuestListDialog from '../ToggleGuestList/ToggleGuestListDialog'
import { MailOpen, QrCode, ScrollText } from 'lucide-react'
import { Badge } from 'src/components/ui/badge'
import { Card } from 'src/components/ui/card'
import { Progress } from 'src/components/ui/progress'
import { Separator } from 'src/components/ui/separator'
import { useViewEventGuests } from './useViewEventGuests'

const ViewEventGuests = () => {
  const { data } = useViewEventGuests()

  console.log(data)

  return (
    <div className='flex flex-col gap-4'>
      <p className='font-semibold text-xl'>At a Glance</p>
      <div className='space-y-2'>
        <p className='text-muted-foreground text-xl'>33 guests</p>
        <Progress value={33} />
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
    </div>
  )
}

export default ViewEventGuests
