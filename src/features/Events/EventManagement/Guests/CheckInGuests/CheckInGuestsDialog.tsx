import DialogButton from 'src/components/DialogButton'
import { QrCode } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'

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
      topIcon={<QrCode size={32} className='text-muted-foreground' />}
      content={<Button className='mt-auto text-[#fff]'>Open Web Scanner</Button>}
    >
      {trigger}
    </DialogButton>
  )
}

export default CheckInGuestsDialog
