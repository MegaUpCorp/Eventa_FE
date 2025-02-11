import { format } from 'date-fns'
import { cn } from 'src/lib/utils'
import { Button } from 'src/components/ui/button'
import { Calendar } from 'src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface DatePickerProps {
  date: Date
  onDateChange: React.Dispatch<React.SetStateAction<Date>>
  className?: string
}

export default function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground', className)}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'EEEE, dd MMMM yyyy') : <span>Choose date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={(day) => day && onDateChange(day)} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
