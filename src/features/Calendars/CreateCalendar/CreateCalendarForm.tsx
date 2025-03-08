import MapInputCard from 'src/components/Goong/MapInputCard'
import CalendarCoverForm from './CalendarCoverForm'
import CalendarProfileForm from './CalendarProfileForm'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { Textarea } from 'src/components/ui/textarea'
import { CreateCalendarSchema } from 'src/schemas/calendarSchema'
import { ColorPicker, ColorPickerItem, colors } from './ColorPicker'
import { cn } from 'src/lib/utils'
import { isFormError } from 'src/utils/utils'

const CreateCalendarForm = () => {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext<CreateCalendarSchema>()

  return (
    <div className='flex flex-col gap-5 relative'>
      <Card className='relative'>
        <CalendarCoverForm />
        <CalendarProfileForm />
        <Separator />
        <div className='p-4 space-y-2 mt-6'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter Calendar name'
                    autoFocus
                    className={cn(
                      'border-none p-0 focus-visible:ring-0 placeholder:text-3xl placeholder:font-semibold md:text-3xl font-semibold',
                      isFormError(errors, 'name') && 'placeholder:text-[#ff000059] bg-[#ff000013]'
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Give a brief description of your calendar'
                    className='border-none p-0 focus-visible:ring-0 placeholder:text-base md:text-base'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>
      <Card className='p-4'>
        <p className='text-xl font-semibold mb-4'>Customization</p>
        <div className='flex items-start gap-10'>
          <div className='flex flex-col gap-2 w-1/2'>
            <p className='font-semibold text-muted-foreground'>Color</p>
            <FormField
              control={control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ColorPicker onValueChange={field.onChange}>
                      {Object.keys(colors).map((color) => (
                        <ColorPickerItem key={color} color={color} value={color} />
                      ))}
                    </ColorPicker>
                  </FormControl>
                </FormItem>
              )}
            />
            <p className='font-semibold text-muted-foreground mt-4'>Calendar URL</p>
            <FormField
              control={control}
              name='publicUrl'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center'>
                      <Button
                        className='rounded-tr-none rounded-br-none text-white font-semibold p-3'
                        variant='secondary'
                      >
                        eventa.com/
                      </Button>
                      <Input
                        placeholder='How people can find your calendar'
                        className={cn(
                          'rounded-tl-none rounded-bl-none w-full',
                          isFormError(errors, 'publicUrl') && 'placeholder:text-[#ff000059] bg-[#ff000013]'
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-2 w-1/2'>
            <p
              className={cn(
                'font-semibold text-muted-foreground',
                !watch('location').id && isFormError(errors, 'name') && 'text-[#ff000059] bg-[#ff000013] rounded-md p-1'
              )}
            >
              Location
            </p>
            <MapInputCard<CreateCalendarSchema> className='h-40' name='location' valueName='location.id' />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreateCalendarForm
