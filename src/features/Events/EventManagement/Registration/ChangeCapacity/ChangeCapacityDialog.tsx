import DialogButton from 'src/components/DialogButton'
import { Download } from 'lucide-react'
import { useState } from 'react'
import { useChangeCapacity } from './useChangeCapacity'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'

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
            <div className='flex justify-between items-center gap-3'>
              <Button type='submit' className='text-[#fff] w-full'>
                Set Limit
              </Button>
              <Button type='submit' className='text-[#fff] w-full' variant='secondary'>
                Remove Limit
              </Button>
            </div>
          </form>
        </Form>
      }
      topIcon={<Download size={32} className='text-muted-foreground rotate-180' />}
      title='Max Capacity'
      subtitle='Auto-close registration when the capacity is reached. Only approved guests count toward the cap.'
    >
      {trigger}
    </DialogButton>
  )
}

export default ChangeCapacityDialog
