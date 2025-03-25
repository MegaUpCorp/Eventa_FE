import DialogButton from 'src/components/DialogButton'
import { ScrollText } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'src/components/ui/button'

interface ToggleGuestListDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const ToggleGuestListDialog = ({ trigger, asChild = false, className }: ToggleGuestListDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      triggerClassName={className}
      asChild={asChild}
      content={<Button className='mt-auto text-[#fff]'>Hide Guest List</Button>}
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          <ScrollText size={32} className='text-muted-foreground' />
        </div>
      }
      title='Public Guest List'
      subtitle='Display the guest count and a few guests on the event page. Even when it is turned on, only registered guests can access the full list.'
    >
      {trigger}
    </DialogButton>
  )
}

export default ToggleGuestListDialog
