import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { format } from 'date-fns'
import { cn } from 'src/lib/utils'
import { Clock } from 'lucide-react'

interface TimePickerProps {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  onTimeChange: (
    type: 'hour' | 'minute' | 'ampm',
    value: string,
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
  ) => void
  className?: string
}

export default function TimePicker({ date, onTimeChange, className, setDate }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const formattedTime = date ? format(date, 'hh:mm aa') : 'AM/PM'

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('justify-start text-left font-medium', !date && 'text-muted-foreground', className)}
        >
          <Clock className='mr-2 h-4 w-4' />
          {formattedTime}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
          {/* Hour Picker */}
          <ScrollArea className='w-64 sm:w-auto'>
            <div className='flex sm:flex-col p-2'>
              {hours.reverse().map((hour) => (
                <Button
                  key={hour}
                  size='icon'
                  variant={date && date.getHours() % 12 === hour % 12 ? 'default' : 'ghost'}
                  className='sm:w-full shrink-0 aspect-square'
                  onClick={() => onTimeChange('hour', hour.toString(), date, setDate)}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='sm:hidden' />
          </ScrollArea>

          {/* Minute Picker */}
          <ScrollArea className='w-64 sm:w-auto'>
            <div className='flex sm:flex-col p-2'>
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  size='icon'
                  variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                  className='sm:w-full shrink-0 aspect-square'
                  onClick={() => onTimeChange('minute', minute.toString(), date, setDate)}
                >
                  {minute}
                </Button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='sm:hidden' />
          </ScrollArea>

          {/* AM/PM Picker */}
          <ScrollArea>
            <div className='flex sm:flex-col p-2'>
              {['AM', 'PM'].map((ampm) => (
                <Button
                  key={ampm}
                  size='icon'
                  variant={
                    date && ((ampm === 'AM' && date.getHours() < 12) || (ampm === 'PM' && date.getHours() >= 12))
                      ? 'default'
                      : 'ghost'
                  }
                  className='sm:w-full shrink-0 aspect-square'
                  onClick={() => onTimeChange('ampm', ampm, date, setDate)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
