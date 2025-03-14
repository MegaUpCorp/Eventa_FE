import DatePicker from 'src/components/DatePicker'
import TimePicker from 'src/components/TimePicker'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { addHours, format } from 'date-fns'
import { CalendarIcon, ChevronsRight, CircleCheckBig, MapPin, Video } from 'lucide-react'
import { useState } from 'react'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Separator } from 'src/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from 'src/components/ui/sheet'
import { Textarea } from 'src/components/ui/textarea'
import { cn } from 'src/lib/utils'
import { handleTimeChange } from 'src/utils/utils'
import { useEditEventSheet } from './useEditEventSheet'

interface EditEventSheetProps {
  trigger: React.ReactNode
  asChild?: boolean
}

export default function EditEventSheet({ trigger, asChild = false }: EditEventSheetProps) {
  const [open, setOpen] = useState(false)
  const { methods } = useEditEventSheet()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addHours(new Date(), 1))

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild={asChild}>{trigger}</SheetTrigger>
      <SheetContent className='p-0 min-w-[520px]'>
        <SheetHeader>
          <SheetTitle className='px-4 pt-4'>Edit event</SheetTitle>
          <Separator className='m-0' />
          <VisuallyHidden>
            <SheetDescription>...</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <Form {...methods}>
          <form className='flex flex-col gap-6 p-4 h-full'>
            <FormField
              control={methods.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Basic info</FormLabel>
                  <FormControl>
                    <Input placeholder='Event name' {...field} />
                  </FormControl>
                  <FormDescription>This is how your event appear on the website</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Description' className='min-h-32' {...field} />
                  </FormControl>
                  <FormDescription>Write a short description about your event (optional)</FormDescription>
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2'>
              <Label>Timeline</Label>
              <div className='flex items-center gap-4 w-full'>
                <DatePicker
                  date={startDate}
                  onDateChange={setStartDate}
                  trigger={
                    <Button
                      variant='outline'
                      className={cn(
                        'justify-start text-left font-normal flex-1',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {startDate ? format(startDate, 'EEEE, dd MMMM yyyy') : <span>Choose date</span>}
                    </Button>
                  }
                />
                <ChevronsRight size={18} />
                <DatePicker
                  date={endDate}
                  onDateChange={setEndDate}
                  trigger={
                    <Button
                      variant='outline'
                      className={cn('justify-start text-left font-normal flex-1', !endDate && 'text-muted-foreground')}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {endDate ? format(endDate, 'EEEE, dd MMMM yyyy') : <span>Choose date</span>}
                    </Button>
                  }
                />
              </div>
              <div className='flex items-center gap-4 w-full'>
                <TimePicker
                  className='flex-1'
                  date={startDate}
                  onTimeChange={handleTimeChange}
                  setDate={setStartDate}
                />
                <ChevronsRight size={18} />
                <TimePicker className='flex-1' date={endDate} onTimeChange={handleTimeChange} setDate={setEndDate} />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-xl font-medium'>Location</p>
              <div className='flex items-center gap-4 w-full'>
                <Card className='p-2 flex items-center gap-4 w-full cursor-pointer'>
                  <Badge className={'p-2 hover:bg-transparent bg-[#38ff4223]'}>
                    <MapPin size={24} className='text-green' />
                  </Badge>
                  <p>In Person</p>
                </Card>
                <Card className='p-2 flex items-center gap-4 w-full cursor-pointer'>
                  <Badge className={'p-2 hover:bg-transparent bg-[#1355e434]'}>
                    <Video size={24} className='text-primary' />
                  </Badge>
                  <p>Virtual</p>
                </Card>
              </div>
              <FormField
                control={methods.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <Input StartIcon={MapPin} placeholder="What's the address?" {...field} />
                    </FormControl>
                    <FormDescription>This is how your event appear on the website</FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className='ml-auto'>
              <Button className='text-[#fff]'>
                <CircleCheckBig />
                Update Event
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
