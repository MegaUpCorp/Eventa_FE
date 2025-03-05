import { MessageSquareText } from 'lucide-react'
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

interface SendABlastDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
}

const SendABlastDialog = ({ trigger, asChild = false }: SendABlastDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className='w-full'>
        {trigger ? (
          trigger
        ) : (
          <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
            <div className='flex items-center gap-3'>
              <Badge className={'p-2 hover:bg-transparent bg-[#ff26e223]'}>
                <MessageSquareText size={24} className='text-pink' />
              </Badge>
              <p className='font-medium'>Send a Blast</p>
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

export default SendABlastDialog
