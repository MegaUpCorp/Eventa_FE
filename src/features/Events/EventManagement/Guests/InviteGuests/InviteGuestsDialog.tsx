import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  MailOpen,
  Search,
  Send,
  UsersRound
} from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Separator } from 'src/components/ui/separator'
import { Textarea } from 'src/components/ui/textarea'
import { cn } from 'src/lib/utils'

interface InviteGuestsDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
}

const isActive = (tab: string, activeTab: string) => (tab === activeTab ? 'bg-accent' : '')

const InviteGuestsDialog = ({ trigger, asChild = false }: InviteGuestsDialogProps) => {
  const [activeTab, setActiveTab] = useState<'email' | 'subscribers'>('email')
  const [inviteState, setInviteState] = useState<'input' | 'send'>('input')

  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className='w-full'>
        {trigger ? (
          trigger
        ) : (
          <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Badge className={'p-2 hover:bg-transparent bg-[#1355e434]'}>
                <MailOpen size={24} className='text-primary' />
              </Badge>
              <p className='font-medium'>Invite Guests</p>
            </div>
          </Card>
        )}
      </DialogTrigger>
      <DialogContent className='p-0 min-w-[800px]'>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Invite Guests</DialogTitle>
            <DialogDescription>Fixed the warning</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {inviteState === 'input' ? (
          <div className='flex flex-col w-full'>
            <p className='px-4 py-3 font-medium text-lg'>Invite Guests</p>
            <Separator />
            <div className='px-2 flex gap-2 h-[520px]'>
              <div className='flex flex-col gap-1 py-2 w-[25%] shrink-0'>
                <div
                  className={cn(
                    'flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer',
                    isActive('email', activeTab)
                  )}
                  onClick={() => setActiveTab('email')}
                >
                  <AtSign size={16} />
                  <p className='font-medium text-sm'>Enter Emails</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer',
                    isActive('subscribers', activeTab)
                  )}
                  onClick={() => setActiveTab('subscribers')}
                >
                  <UsersRound size={16} />
                  <p className='font-medium text-sm'>Subscribers</p>
                </div>
              </div>
              <Separator orientation='vertical' className='h-full' />
              <div className='px-3 py-5 w-full'>{activeTab === 'email' ? <EnterEmailsTab /> : <SubscribersTab />}</div>
            </div>
            <Separator />
            <div className='px-4 py-3 flex'>
              <Button className='ml-auto text-[#fff]' onClick={() => setInviteState('send')}>
                Next
                <ChevronRight />
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col w-full'>
            <p className='px-4 py-3 font-medium text-lg'>Invite Guests</p>
            <Separator />
            <div className='px-2 flex gap-2 h-[520px]'>
              <div className='flex flex-col gap-2 p-2 w-[30%] shrink-0'>
                <p className='font-medium text-sm text-muted-foreground'>Inviting 1 Person</p>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-6 h-6'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className='font-medium text-sm text-muted-foreground truncate'>demoABC@gmail.com</p>
                </div>
              </div>
              <Separator orientation='vertical' className='h-full' />
              <div className='px-3 py-5 w-full flex flex-col gap-3'>
                <Card>
                  <p className='font-medium text-sm p-4 bg-accent rounded-t-lg'>
                    Hi, Account VIP invites you to join Global AI
                  </p>
                  <Textarea
                    autoFocus
                    className='rounded-none border-none min-h-20 focus-visible:ring-0'
                    placeholder='Add a custom message here...'
                  />
                  <p className='font-medium text-sm p-4 bg-accent rounded-b-lg'>RSVP: eventa.com/global-ai</p>
                </Card>
              </div>
            </div>
            <Separator />
            <div className='px-4 py-3 flex items-center justify-between'>
              <Button className='text-[#fff]' variant='secondary' onClick={() => setInviteState('input')}>
                <ChevronLeft />
                Back
              </Button>
              <Button className='text-[#fff]'>
                <Send />
                Send Invites
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default InviteGuestsDialog

const EnterEmailsTab = () => {
  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='enter-emails'>Add Emails</Label>
        <div className='flex items-center gap-2'>
          <Input id='enter-emails' placeholder='Paste or enter emails here' autoFocus className='w-full' />
          <Button variant='secondary'>Add</Button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Import CSV</Label>
        <div className='flex flex-col items-center justify-center h-48 border-dashed border rounded-md'>
          <FileSpreadsheet size={40} className='mb-4 text-muted-foreground' />
          <p className='font-medium text-muted-foreground'>Import CSV file</p>
          <p className='text-muted-foreground text-sm'>Drop file or click here to choose file</p>
        </div>
        <div className='flex items-center gap-2 mt-1 cursor-pointer hover:text-[#fff] text-muted-foreground '>
          <Download size={14} />
          <p className='text-sm font-medium'>Download CSV Template</p>
        </div>
      </div>
    </div>
  )
}

const SubscribersTab = () => {
  return (
    <div>
      <Input placeholder='Search in "All Subscribers"' StartIcon={Search} />
      <div className='flex justify-between items-center my-3'>
        <p className='text-muted-foreground text-sm font-medium'>0 People</p>
        <p className='text-muted-foreground text-sm font-medium'>Select All</p>
      </div>
      <Separator />
    </div>
  )
}
