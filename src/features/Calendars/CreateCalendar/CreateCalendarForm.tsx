import CalendarProfileForm from './CalendarProfileForm'
import CalendarCoverForm from './CalendarCoverForm'
import { useFormContext } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { Textarea } from 'src/components/ui/textarea'
import { ColorPicker, ColorPickerItem, colors } from './ColorPicker'
import { CreateCalendarFormValues } from './useCreateCalendar'

const CreateCalendarForm = () => {
  const { control } = useFormContext<CreateCalendarFormValues>()

  return (
    <div className='flex flex-col gap-5'>
      <Card className='relative'>
        <CalendarCoverForm />
        <CalendarProfileForm />
        <Separator />
        <div className='p-4 space-y-2 mt-6'>
          <FormField
            control={control}
            name='calendarName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter Calendar name'
                    autoFocus
                    className='border-none p-0 focus-visible:ring-0 placeholder:text-3xl placeholder:font-semibold md:text-3xl font-semibold'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={control}
            name='calendarDescription'
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
              name='calendarColor'
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
              name='calendarPublicUrl'
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
                        placeholder='Random if leave blank'
                        {...field}
                        className='rounded-tl-none rounded-bl-none w-full'
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-2 w-1/2'>
            <p className='font-semibold text-muted-foreground'>Location</p>
            <Card className='min-h-40 p-4'>Insert Map Here!</Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreateCalendarForm
