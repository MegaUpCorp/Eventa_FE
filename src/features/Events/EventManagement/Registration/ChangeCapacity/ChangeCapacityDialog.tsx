import DialogButton from 'src/components/DialogButton'
import { Download } from 'lucide-react'
import { useState } from 'react'
import { useChangeCapacity } from './useChangeCapacity'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { DialogClose, DialogFooter } from 'src/components/ui/dialog'

interface ChangeCapacityDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const ChangeCapacityDialog = ({ trigger, asChild = false, className }: ChangeCapacityDialogProps) => {
  const [open, setOpen] = useState(false)
  const { methods } = useChangeCapacity()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      triggerClassName={className}
      asChild={asChild}
      content={
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={methods.control}
              name='capacity'
              render={() => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input placeholder='Event Capacity' autoFocus />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex items-center gap-3 w-full'>
              <DialogFooter className='w-full'>
                <DialogClose asChild>
                  <Button type='submit' className='text-[#fff] w-full'>
                    Set Limit
                  </Button>
                </DialogClose>
                <Button type='submit' className='text-[#fff] w-full' variant='secondary'>
                  Remove Limit
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      }
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          <Download size={32} className='text-muted-foreground rotate-180' />
        </div>
      }
      title='Max Capacity'
      subtitle='Auto-close registration when the capacity is reached. Only approved guests count toward the cap.'
    >
      {trigger}
    </DialogButton>
  )
}

export default ChangeCapacityDialog
