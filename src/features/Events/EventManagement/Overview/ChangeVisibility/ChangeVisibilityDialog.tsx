import DialogButton from 'src/components/DialogButton'
import { Globe, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { cn } from 'src/lib/utils'
import { useChangeVisibility } from './useChangeVisibility'
import { DialogFooter } from 'src/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

interface ChangeVisibilityDialogProps {
  trigger: React.ReactNode
  asChild?: boolean
  className?: string
  visibility: 'public' | 'private'
}

const ChangeVisibilityDialog = ({ trigger, asChild = false, className, visibility }: ChangeVisibilityDialogProps) => {
  const { methods } = useChangeVisibility()
  const [open, setOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <DialogButton
      open={open}
      setOpen={setOpen}
      title={visibility === 'public' ? 'Public Event' : 'Private Event'}
      subtitle={
        visibility === 'public'
          ? 'This event is listed on your calendar and is eligible to be featured by Luma or listed by other community calendars.'
          : 'This event is not listed, featured by Eventa, or indexed by search engines. Guests are not asked to share it.'
      }
      topIcon={
        <div className='p-3 mr-auto rounded-full glass text-muted-foreground'>
          {visibility === 'public' ? <Globe size={32} /> : <LockKeyhole size={32} />}
        </div>
      }
      asChild={asChild}
      className={cn('flex flex-col w-96', className)}
      content={
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
            <DialogFooter>
              <DialogClose asChild>
                <Button type='submit' className='text-[#fff]'>
                  Update Visibility
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      }
    >
      {trigger}
    </DialogButton>
  )
}

export default ChangeVisibilityDialog
