import { QrCode } from 'lucide-react'
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

interface CheckInGuestsDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const CheckInGuestsDialog = ({ trigger, asChild = false, className }: CheckInGuestsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={cn('', className)}>
        {trigger ? (
          trigger
        ) : (
          <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Badge className={'p-2 hover:bg-transparent bg-[#38ff4223]'}>
                <QrCode size={24} className='text-green' />
              </Badge>
              <p className='font-medium'>Check In Guests</p>
            </div>
          </Card>
        )}
      </DialogTrigger>
      <DialogContent className='flex flex-col w-96'>
        <div className='p-3 mr-auto rounded-full glass'>
          <QrCode size={32} className='text-muted-foreground' />
        </div>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Check In Guests</DialogTitle>
          <DialogDescription>You can check in guests with our web scanner.</DialogDescription>
        </DialogHeader>
        <Button className='mt-auto text-[#fff]'>Open Web Scanner</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CheckInGuestsDialog
