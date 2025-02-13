import DatePicker from 'src/components/DatePicker'
import { Form } from 'src/components/ui/form'
import { HeroSearchEventFormValues, useHeroSearchEvent } from './useHeroSearchEvent'
import { HeroSearchTrigger } from 'src/components/HomePage/HeroSection/HeroSearchTrigger'
import { format } from 'date-fns'
import { Button } from 'src/components/ui/button'
import { Search } from 'lucide-react'
import { Combobox } from 'src/components/Combobox'
import { useState } from 'react'
import { RangeSlider } from 'src/components/RangeSlider'
import { formatPrice } from 'src/utils/helper'

const location = [
  { value: 'hcm', label: 'Ho Chi Minh City' },
  { value: 'hn', label: 'Ha Noi' },
  { value: 'hp', label: 'Hai Phong' },
  { value: 'dn', label: 'Dong Nai' },
  { value: 'qn', label: 'Quang Ninh' }
]

export const HeroSearchEventFormProvider = () => {
  const { methods } = useHeroSearchEvent()
  const [date, setDate] = useState<Date>(new Date())
  const [priceRanges, setPriceRanges] = useState([0, 200_000])

  return (
    <Form {...methods}>
      <div className='grid grid-cols-12 items-center'>
        <div className='col-span-3'>
          <Combobox<HeroSearchEventFormValues>
            data={location}
            name='location'
            placeholder='Search for location'
            trigger={
              <HeroSearchTrigger
                label='Location'
                value={location.find((item) => item.value === methods.watch('location'))?.label || ''}
              />
            }
          />
        </div>
        <div className='col-span-4'>
          <DatePicker
            date={date}
            onDateChange={setDate}
            trigger={<HeroSearchTrigger label='Date' value={format(date, 'EEEE, dd MMMM yyyy')} />}
          />
        </div>
        <div className='col-span-3'>
          {/* FIXME: Popover shift when switch slider */}
          <RangeSlider
            min={0}
            max={1_000_000}
            minStepsBetweenThumbs={10_000}
            step={1}
            label='Price'
            priceRanges={priceRanges}
            setPriceRanges={setPriceRanges}
            trigger={
              <HeroSearchTrigger
                label='Price'
                value={`${formatPrice(priceRanges[0])} to ${formatPrice(priceRanges[1])} VND`}
              />
            }
          />
        </div>
        <div className='col-span-2 flex justify-end'>
          <Button size='icon' className='w-12 h-12'>
            <Search className='text-white dark:text-foreground' />
          </Button>
        </div>
      </div>
    </Form>
  )
}
