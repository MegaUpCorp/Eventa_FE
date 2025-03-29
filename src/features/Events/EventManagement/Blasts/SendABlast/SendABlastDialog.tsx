import DialogButton from 'src/components/DialogButton'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Textarea } from 'src/components/ui/textarea'
import { useSendABlast } from './useSendABlast'

interface SendABlastDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
  className?: string
}

const SendABlastDialog = ({ trigger, asChild = false, className }: SendABlastDialogProps) => {
  const { methods } = useSendABlast()
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
      triggerClassName={className}
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          <Mail size={32} className='text-muted-foreground' />
        </div>
      }
      title='Send Blast'
      subtitle='Guests will receive the blast via email. It will also be shown on the event page.'
      content={
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={methods.control}
              name='subject'
              render={() => (
                <FormItem>
                  <FormLabel>Subject (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='New message in ${eventName}' autoFocus />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name='message'
              render={() => (
                <FormItem>
                  <FormLabel>Subject (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Share a message with your guests' className='min-h-32 max-h-48' />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' className='text-[#fff]'>
              <Send />
              Send
            </Button>
          </form>
        </Form>
      }
    >
      {trigger}
    </DialogButton>
  )
}

export default SendABlastDialog
