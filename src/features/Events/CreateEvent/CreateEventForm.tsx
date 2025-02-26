import DatePicker from 'src/components/DatePicker'
import GoongMap from 'src/components/Goong/GoongMap'
import MapDialog from 'src/components/Goong/MapDialog'
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
  UserRoundCheck,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
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
import { cn } from 'src/lib/utils'
import { useGetLocation } from 'src/features/Map/useGetLocation'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { CreateEventSchema, defaultLocationValues } from 'src/schemas/eventSchema'
import { isFormError } from 'src/utils/utils'

const CreateEventForm = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors
  } = useFormContext<CreateEventSchema>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addHours(new Date(), 1))

  const { data: locationDetail } = useGetLocation(watch('location.id'))

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

  useEffect(() => {
    if (locationDetail) {
      const location = {
        id: locationDetail.place_id,
        name: locationDetail.name,
        address: locationDetail.formatted_address,
        lat: locationDetail.geometry.location.lat,
        lng: locationDetail.geometry.location.lng
      }
      setValue('location', location)
    }
  }, [locationDetail])

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate)
      setEndDate(addHours(endDate, 1))
    }
    setValue('startDate', startDate.toISOString())
    setValue('endDate', endDate.toISOString())
  }, [startDate, endDate])

  const type = watch('type')
  const price = watch('price')
  const location = watch('location')
  const meetUrl = watch('meetUrl')

  useEffect(() => {
    setValue('isFree', type === 'free')
    setValue('isOnline', !location.id && meetUrl !== '')
    if (type === 'paid' && !price) {
      setError('price', { type: 'required', message: 'Please enter a price' })
    } else {
      clearErrors('price')
    }
  }, [type, location, meetUrl, price])

  return (
    <>
      <div className='flex justify-between items-center'>
        {/* Calendar */}
        <FormField
          control={control}
          name='calendarId'
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
          name='visibility'
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
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder='Enter event name'
                autoFocus
                className={cn(
                  'border-none p-0 focus-visible:ring-0 placeholder:text-4xl placeholder:font-semibold my-4 h-14 md:text-4xl font-semibold',
                  isFormError<CreateEventSchema>(errors, 'title') && 'placeholder:text-[#ff000059] bg-[#ff000013]'
                )}
                spellCheck={false}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className='flex flex-col gap-3'>
        <Card className='flex flex-col gap-3 p-4'>
          <div className='flex items-center gap-3'>
            <p className='w-32 font-medium'>Start</p>
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
            <p className='w-32 font-medium'>End</p>
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

        {watch('location') && locationDetail ? (
          <>
            <Card className='flex gap-3 p-4'>
              <MapPin size={18} className='mt-0.5 text-muted-foreground' />
              <div className='flex flex-col'>
                <p className='font-medium'>{locationDetail.name}</p>
                <p className='text-muted-foreground text-sm'>
                  {locationDetail.formatted_address.replace(locationDetail.name + ', ', '')}
                </p>
              </div>
              <X
                size={18}
                className='text-muted-foreground cursor-pointer ml-auto'
                onClick={() => setValue('location', defaultLocationValues)}
              />
            </Card>
            <GoongMap
              center={[locationDetail?.geometry.location.lng || 0, locationDetail?.geometry.location.lat || 0]}
            />
          </>
        ) : (
          <MapDialog<CreateEventSchema>
            asChild={false}
            name='location.id'
            trigger={
              <Card
                className={cn(
                  'flex gap-3 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                  isFormError<CreateEventSchema>(errors, 'location') && 'border-[#ff000059] border-2'
                )}
              >
                <MapPin size={18} className='mt-0.5 text-muted-foreground' />
                <div className='flex flex-col'>
                  <p className='font-medium'>Add Event Location</p>
                  <p className='text-muted-foreground text-sm'>Online or Offline Event</p>
                </div>
              </Card>
            }
          />
        )}

        <Dialog>
          <DialogTrigger>
            <Card
              className={cn(
                'flex gap-3 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                isFormError<CreateEventSchema>(errors, 'description') && 'border-[#ff000059] border-2'
              )}
            >
              <NotepadText size={18} className='mt-0.5 text-muted-foreground' />
              <p className='font-medium'>Add Event Description</p>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Description</DialogTitle>
              <DialogDescription>Overview of the event</DialogDescription>
            </DialogHeader>
            <ScrollArea className='min-h-40 max-h-96'>
              <FormField
                control={control}
                name='description'
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap onChange={onChange} className='w-[448px] h-full' lsSectionName='event-desc' />
                    </FormControl>
                  </FormItem>
                )}
              />
            </ScrollArea>
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
              name='type'
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
                      <SelectItem value='paid'>
                        <div className='flex'>
                          <CircleDollarSign size={18} className='text-muted-foreground mr-2' />
                          <p className='font-semibold text-muted-foreground'>Paid</p>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {isFormError<CreateEventSchema>(errors, 'price') && 'Please enter price'}
            {/* TODO: Add the input for paid event ticket type */}
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <UserRoundCheck size={18} className='text-muted-foreground' />
              <p className='font-medium'>Require Approval</p>
            </div>
            <FormField
              control={control}
              name='requiresApproval'
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
          <Separator />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Database size={18} className='text-muted-foreground' />
              <p className='font-medium'>Capacity</p>
            </div>
            <FormField
              control={control}
              name='capacity'
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

export default CreateEventForm
