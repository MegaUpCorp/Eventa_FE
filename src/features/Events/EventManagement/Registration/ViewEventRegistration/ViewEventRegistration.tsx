import ChangeCapacityDialog from '../ChangeCapacity/ChangeCapacityDialog'
import ChangeRegistrationDialog from '../ChangeRegistration/ChangeRegistrationDialog'
import CustomizeRegistrationEmailSheet from '../CustomizeRegistrationEmail/CustomizeRegistrationEmailSheet'
import { ArrowUpToLine, Mail, Ticket } from 'lucide-react'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'

const ViewEventRegistration = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-3'>
        <ChangeRegistrationDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#38ff4223]'}>
                  <Ticket size={24} className='text-green' />
                </Badge>
                <div className='flex flex-col items-start'>
                  <p className='font-medium'>Registration</p>
                  <p className='text-xs text-muted-foreground'>Open</p>
                </div>
              </div>
            </Card>
          }
        />
        <ChangeCapacityDialog
          className='w-full'
          trigger={
            <Card className='flex items-center gap-3 p-2 glass w-full cursor-pointer'>
              <div className='flex items-center gap-3'>
                <Badge className={'p-2 hover:bg-transparent bg-[#ff592723]'}>
                  <ArrowUpToLine size={24} className='text-orange' />
                </Badge>
                <div className='flex flex-col items-start'>
                  <p className='font-medium'>Event Capacity</p>
                  <p className='text-xs text-muted-foreground'>Unlimited</p>
                </div>
              </div>
            </Card>
          }
        />
      </div>
      <Separator className='my-2' />
      <div className='flex flex-col gap-1'>
        <p className='font-semibold text-xl'>Registration Email</p>
        <p className='text-muted-foreground mb-4'>
          Upon registration, we send guests a confirmation email that includes a calendar invite. You can add a custom
          message to the email.
        </p>
        <CustomizeRegistrationEmailSheet
          asChild
          trigger={
            <Button className='text-[#fff] mr-auto'>
              <Mail />
              Customize Email
            </Button>
          }
        />
      </div>
      <Separator className='my-2' />
      <div className='flex flex-col gap-1'>
        <p className='font-semibold text-xl'>Registration Questions</p>
        <p className='text-muted-foreground mb-4'>
          We will ask guests the following questions when they register for the event.
        </p>
        {/* TODO: Implement later */}
      </div>
    </div>
  )
}

export default ViewEventRegistration
