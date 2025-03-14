import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from 'src/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import { Separator } from 'src/components/ui/separator'
import { Card } from 'src/components/ui/card'
import { Textarea } from 'src/components/ui/textarea'
import { Button } from 'src/components/ui/button'
import { CircleCheckBig } from 'lucide-react'

interface CustomizeRegistrationEmailSheetProps {
  trigger: React.ReactNode
  asChild?: boolean
}

const CustomizeRegistrationEmailSheet = ({ trigger, asChild = false }: CustomizeRegistrationEmailSheetProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild={asChild}>{trigger}</SheetTrigger>
      <SheetContent className='p-0 min-w-[520px]'>
        <SheetHeader>
          <SheetTitle className='px-4 pt-4'>Customize your email</SheetTitle>
          <Separator className='m-0' />
          <VisuallyHidden>
            <SheetDescription>...</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <div className='flex flex-col gap-4 p-4'>
          <Card className='p-4 flex flex-col gap-4'>
            <p className='font-semibold'>Registration confirmed for eventName</p>
            <Textarea className='min-h-32' placeholder='Add a custom message to the email' />
          </Card>
          <Button className='ml-auto text-[#fff]'>
            <CircleCheckBig />
            Update Email
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CustomizeRegistrationEmailSheet
