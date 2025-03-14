import { ScrollText } from 'lucide-react'
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
import { cn } from 'src/lib/utils'

interface ToggleGuestListDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const ToggleGuestListDialog = ({ trigger, asChild = false, className }: ToggleGuestListDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={cn('', className)}>
        {trigger ? (
          trigger
        ) : (
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
        )}
      </DialogTrigger>
      <DialogContent className='flex flex-col w-96'>
        <div className='p-3 mr-auto rounded-full glass'>
          <ScrollText size={32} className='text-muted-foreground' />
        </div>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Public Guest List</DialogTitle>
          <DialogDescription>
            <p>Display the guest count and a few guests on the event page.</p>
            <p>Even when it is turned on, only registered guests can access the full list.</p>
          </DialogDescription>
        </DialogHeader>
        <Button className='mt-auto text-[#fff]'>Hide Guest List</Button>
      </DialogContent>
    </Dialog>
  )
}

export default ToggleGuestListDialog
