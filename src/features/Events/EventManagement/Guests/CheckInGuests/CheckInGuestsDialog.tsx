import DialogButton from 'src/components/DialogButton'
import { QrCode } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { DialogClose, DialogFooter } from 'src/components/ui/dialog'

interface CheckInGuestsDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const CheckInGuestsDialog = ({ trigger, asChild = false, className }: CheckInGuestsDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      triggerClassName={className}
      asChild={asChild}
      title='Check In Guests'
      subtitle='You can check in guests with our web scanner.'
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          <QrCode size={32} className='text-muted-foreground' />
        </div>
      }
      content={
        <DialogFooter>
          <DialogClose asChild>
            <Button className='mt-auto text-[#fff] w-full'>Open Web Scanner</Button>
          </DialogClose>
        </DialogFooter>
      }
    >
      {trigger}
    </DialogButton>
  )
}

export default CheckInGuestsDialog
