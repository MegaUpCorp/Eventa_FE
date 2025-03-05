import { Repeat } from 'lucide-react'
import { Badge } from 'src/components/ui/badge'
import { Card } from 'src/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'

interface ShareEventDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
}

const ShareEventDialog = ({ trigger, asChild = false }: ShareEventDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className='w-full'>
        {trigger ? (
          trigger
        ) : (
          <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Badge className={'p-2 hover:bg-transparent bg-[#38ff4223]'}>
                <Repeat size={24} className='text-green' />
              </Badge>
              <p className='font-medium'>Share Event</p>
            </div>
          </Card>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ShareEventDialog
