import { Mail, MessageSquareText, Send } from 'lucide-react'
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
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useSendABlast } from './useSendABlast'
import { Textarea } from 'src/components/ui/textarea'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'

interface SendABlastDialogProps {
  trigger?: React.ReactNode
  asChild?: boolean
}

const SendABlastDialog = ({ trigger, asChild = false }: SendABlastDialogProps) => {
  const { methods } = useSendABlast()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

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
      <DialogContent className='flex flex-col'>
        <div className='p-4 mr-auto rounded-full glass'>
          <Mail size={24} />
        </div>
        <DialogHeader>
          <DialogTitle>Send Blast</DialogTitle>
          <DialogDescription>
            Guests will receive the blast via email. It will also be shown on the event page.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}

export default SendABlastDialog
