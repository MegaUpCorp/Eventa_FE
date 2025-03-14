import DialogButton from 'src/components/DialogButton'
import { Ticket } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Switch } from 'src/components/ui/switch'
import { Label } from 'src/components/ui/label'

interface ChangeRegistrationDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const ChangeRegistrationDialog = ({ trigger, asChild = false, className }: ChangeRegistrationDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      triggerClassName={className}
      asChild={asChild}
      content={
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='accept-registration' className='text-base'>
              Accept Registration
            </Label>
            <Switch id='accept-registration' />
          </div>
          <Button className='w-full text-[#fff]'>Confirm</Button>
        </div>
      }
      topIcon={<Ticket size={32} className='text-muted-foreground' />}
      title='Registration'
      subtitle='Close registration to stop accepting new guests, including anyone who may have been invited.'
    >
      {trigger}
    </DialogButton>
  )
}

export default ChangeRegistrationDialog
