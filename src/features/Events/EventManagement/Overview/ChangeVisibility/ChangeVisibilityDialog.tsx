import { Globe, LockKeyhole } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { cn } from 'src/lib/utils'
import { useChangeVisibility } from './useChangeVisibility'

interface ChangeVisibilityDialogProps {
  trigger: React.ReactNode
  asChild?: boolean
  className?: string
  visibility: 'public' | 'private'
}

const ChangeVisibilityDialog = ({ trigger, asChild = false, className, visibility }: ChangeVisibilityDialogProps) => {
  const { methods } = useChangeVisibility()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild={asChild} className={cn('', className)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className='flex flex-col h-[340px] w-96'>
        <div className='p-4 mr-auto rounded-full glass'>
          {visibility === 'public' ? <Globe size={24} /> : <LockKeyhole size={24} />}
        </div>
        <DialogHeader>
          <DialogTitle>{visibility === 'public' ? 'Public Event' : 'Private Event'}</DialogTitle>
          <DialogDescription>
            {visibility === 'public'
              ? 'This event is listed on your calendar and is eligible to be featured by Luma or listed by other community calendars.'
              : 'This event is not listed, featured by Eventa, or indexed by search engines. Guests are not asked to share it.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={methods.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={visibility}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='public'>
                        <div className='flex items-center gap-2'>
                          <Globe size={18} />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value='private'>
                        <div className='flex items-center gap-2'>
                          <LockKeyhole size={18} />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type='submit' className='text-[#fff]'>
              Update Visibility
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeVisibilityDialog
