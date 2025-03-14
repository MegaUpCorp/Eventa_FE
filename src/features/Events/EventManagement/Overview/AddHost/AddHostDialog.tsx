import { UserRoundPlus } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { cn } from 'src/lib/utils'
import { useAddHost } from './useAddHost'

interface AddHostDialogProps {
  trigger: React.ReactNode
  asChild?: boolean
  className?: string
}

const AddHostDialog = ({ trigger, asChild = false, className }: AddHostDialogProps) => {
  const { methods } = useAddHost()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={cn('', className)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className='flex flex-col h-96 w-96'>
        <div className='p-4 mr-auto rounded-full glass'>
          <UserRoundPlus size={24} />
        </div>
        <DialogHeader>
          <DialogTitle>Add Host</DialogTitle>
          <DialogDescription>
            Add a host to highlight them on the event page or to get help managing the event.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}

export default AddHostDialog
