import { CircleDollarSign } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'src/lib/utils'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Slider } from './ui/slider'
import { formatPrice } from 'src/utils/helper'

interface RangeSliderProps {
  min: number
  max: number
  minStepsBetweenThumbs: number
  step: number
  defaultValue?: number[]
  label: string
  usePopover?: boolean
  trigger?: React.ReactNode
  asChild?: boolean
  priceRanges: number[]
  setPriceRanges: React.Dispatch<React.SetStateAction<number[]>>
}

export const RangeSlider = ({
  min,
  max,
  minStepsBetweenThumbs,
  step,
  priceRanges,
  setPriceRanges,
  label,
  usePopover = true,
  trigger,
  asChild
}: RangeSliderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (newValues: number[]) => {
    if (newValues[0] > newValues[1]) {
      newValues = [newValues[1], newValues[0]]
    }
    setPriceRanges(newValues)
  }

  const handleInputChange = (index: number, value: string) => {
    const numericValue = Math.max(0, Math.min(max, Number(value.replace(/\D/g, ''))))

    if (!isNaN(numericValue)) {
      let newValues = [...priceRanges]
      newValues[index] = numericValue

      if (newValues[0] > newValues[1]) {
        newValues = [newValues[1], newValues[0]]
      }
      setPriceRanges(newValues)
    }
  }

  const sliderComponent = (
    <div className='grid gap-4 p-4 w-full max-w-80 bg-white border border-[#14424C]/20 rounded-[12px]'>
      <Label className='text-sm font-medium'>{label}</Label>
      <Slider
        value={priceRanges}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        max={max}
        min={min}
        step={step}
        onValueChange={handleValueChange}
        className={cn('w-full')}
      />
      <div className='flex gap-2 flex-wrap'>
        <ol className='flex items-center w-full gap-3'>
          {priceRanges.map((value, index) => (
            <Input
              key={index}
              value={formatPrice(value)}
              className='w-full'
              onChange={(e) => handleInputChange(index, e.target.value)}
              EndIcon={CircleDollarSign}
            />
          ))}
        </ol>
      </div>
    </div>
  )

  return usePopover ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild={asChild}>{trigger}</PopoverTrigger>
      <PopoverContent className='w-auto p-0'>{sliderComponent}</PopoverContent>
    </Popover>
  ) : (
    sliderComponent
  )
}
