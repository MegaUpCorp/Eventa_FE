import DialogButton from 'src/components/DialogButton'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useAddHost } from './useAddHost'
import { cn } from 'src/lib/utils'

interface AddHostDialogProps {
  trigger: React.ReactNode
  asChild?: boolean
  className?: string
}

const AddHostDialog = ({ trigger, asChild = false, className }: AddHostDialogProps) => {
  const { methods } = useAddHost()
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      asChild={asChild}
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          <UserRoundPlus size={32} className='text-muted-foreground' />
        </div>
      }
      title='Add Host'
      subtitle='Add a host to highlight them on the event page or to get help managing the event.'
      className={cn('flex flex-col h-96 w-96', className)}
      content={
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={methods.control}
              name='subject'
              render={() => (
                <FormItem>
                  <FormLabel>Enter Email or Search</FormLabel>
                  <FormControl>
                    <Input autoFocus />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      }
    >
      {trigger}
    </DialogButton>
  )
}

export default AddHostDialog
