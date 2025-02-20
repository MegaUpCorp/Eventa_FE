import { useState } from 'react'
import { Calendar } from 'src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'

interface DatePickerProps {
  date: Date
  onDateChange: React.Dispatch<React.SetStateAction<Date>>
  trigger: React.ReactNode
  asChild?: boolean
  className?: string
  usePopover?: boolean
}

export default function DatePicker({
  date,
  onDateChange,
  trigger,
  asChild = true,
  usePopover = true,
  className
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const calendarComponent = (
    <Calendar mode='single' selected={date} onSelect={(day) => day && onDateChange(day)} initialFocus />
  )

  return usePopover ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild={asChild} className={className}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>{calendarComponent}</PopoverContent>
    </Popover>
  ) : (
    <div>{calendarComponent}</div>
  )
}
