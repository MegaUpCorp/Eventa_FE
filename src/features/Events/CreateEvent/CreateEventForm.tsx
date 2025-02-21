import DatePicker from 'src/components/DatePicker'
import TimePicker from 'src/components/TimePicker'
import Tiptap from 'src/components/TipTap/TipTap'
import { addHours, format } from 'date-fns'
import {
  CalendarIcon,
  CircleDollarSign,
  Database,
  DoorOpen,
  Globe,
  GlobeLock,
  MapPin,
  NotepadText,
  Ticket,
  UserRoundCheck
} from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Card } from 'src/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Separator } from 'src/components/ui/separator'
import { Switch } from 'src/components/ui/switch'
import { FormValues } from './useCreateEvent'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'

export const CreateEventForm = () => {
  const { control } = useFormContext<FormValues>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addHours(new Date(), 1))
  
  const handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string,
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    if (date) {
      const newDate = new Date(date)
      if (type === 'hour') {
        newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0))
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value))
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours()
        newDate.setHours(value === 'PM' ? currentHours + 12 : currentHours - 12)
      }
      setDate(newDate)
    }
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        {/* Calendar */}
        <FormField
          control={control}
          name='eventCalendar'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='ring-0 focus:ring-0'>
                    <SelectValue placeholder='Choose calendar' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='pc'>
                    <p className='font-semibold text-muted-foreground'>Personal Calendar</p>
                  </SelectItem>
                  <SelectItem value='c1'>
                    <p className='font-semibold text-muted-foreground'>Calendar 1</p>
                  </SelectItem>
                  <SelectItem value='c2'>
                    <p className='font-semibold text-muted-foreground'>Calendar 2</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* Visibility */}
        <FormField
          control={control}
          name='eventVisibility'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='ring-0 focus:ring-0'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='public'>
                    <div className='flex'>
                      <Globe size={18} className='text-muted-foreground mr-2' />
                      <p className='font-semibold text-muted-foreground'>Public</p>
                    </div>
                  </SelectItem>
                  <SelectItem value='private'>
                    <div className='flex'>
                      <GlobeLock size={18} className='text-muted-foreground mr-2' />
                      <p className='font-semibold text-muted-foreground'>Private</p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name='eventName'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder='Enter event name'
                autoFocus
                className='border-none p-0 focus-visible:ring-0 placeholder:text-4xl placeholder:font-semibold h-20 md:text-4xl font-semibold'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className='flex flex-col gap-3'>
        <Card className='flex flex-col gap-3 p-4'>
          <div className='flex items-center gap-3'>
            <p className='w-56 font-medium'>Start</p>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              className='w-full'
              trigger={
                <Button
                  variant='outline'
                  className={cn('justify-start text-left font-normal w-full', !startDate && 'text-muted-foreground')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {startDate ? format(startDate, 'EEEE, dd MMMM yyyy') : <span>Choose date</span>}
                </Button>
              }
            />
            <TimePicker date={startDate} onTimeChange={handleTimeChange} setDate={setStartDate} />
          </div>
          <div className='flex items-center gap-3'>
            <p className='w-56 font-medium'>End</p>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              className='w-full'
              trigger={
                <Button
                  variant='outline'
                  className={cn('justify-start text-left font-normal w-full', !endDate && 'text-muted-foreground')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {endDate ? format(endDate, 'EEEE, dd MMMM yyyy') : <span>Choose date</span>}
                </Button>
              }
            />
            <TimePicker date={endDate} onTimeChange={handleTimeChange} setDate={setEndDate} />
          </div>
        </Card>
        <Card className='flex gap-3 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer'>
          <MapPin size={18} className='mt-0.5 text-muted-foreground' />
          <div className='flex flex-col'>
            <p className='font-medium'>Add Event Location</p>
            <p className='text-muted-foreground text-sm'>Online or Offline Event</p>
          </div>
        </Card>
        <Dialog>
          <DialogTrigger>
            <Card className='flex gap-3 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer'>
              <NotepadText size={18} className='mt-0.5 text-muted-foreground' />
              <p className='font-medium'>Add Event Description</p>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Description</DialogTitle>
              <DialogDescription>Overview of the event</DialogDescription>
            </DialogHeader>
            <FormField
              control={control}
              name='eventDescription'
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormControl>
                    <Tiptap onChange={onChange} className='min-h-40' lsSectionName='event-desc' />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Done
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className='flex flex-col gap-3 p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Ticket size={18} className='text-muted-foreground' />
              <p className='font-medium'>Tickets</p>
            </div>
            <FormField
              control={control}
              name='eventTicketType'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='ring-0 focus:ring-0'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='free'>
                        <div className='flex'>
                          <DoorOpen size={18} className='text-muted-foreground mr-2' />
                          <p className='font-semibold text-muted-foreground'>Free</p>
                        </div>
                      </SelectItem>
                      <SelectItem value='fee'>
                        <div className='flex'>
                          <CircleDollarSign size={18} className='text-muted-foreground mr-2' />
                          <p className='font-semibold text-muted-foreground'>Fee</p>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* TODO: Add the input for fee event ticket type */}
          </div>
          <Separator className='my-1' />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <UserRoundCheck size={18} className='text-muted-foreground' />
              <p className='font-medium'>Require Approval</p>
            </div>
            <FormField
              control={control}
              name='eventApprovalRequired'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* TODO: Add the input for fee event ticket type */}
          </div>
          <Separator className='my-1' />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Database size={18} className='text-muted-foreground' />
              <p className='font-medium'>Capacity</p>
            </div>
            <FormField
              control={control}
              name='eventCapacity'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='ring-0 focus:ring-0'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='50'>
                        <p className='font-semibold text-muted-foreground'>50</p>
                      </SelectItem>
                      <SelectItem value='100'>
                        <p className='font-semibold text-muted-foreground'>100</p>
                      </SelectItem>
                      <SelectItem value='200'>
                        <p className='font-semibold text-muted-foreground'>200</p>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </Card>
      </div>
    </>
  )
}
