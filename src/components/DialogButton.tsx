import { cn } from 'src/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface DialogButtonProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  asChild?: boolean
  triggerClassName?: string
  className?: string
  content: React.ReactNode
  footer?: React.ReactNode
  title?: string
  topIcon?: React.ReactNode
  subtitle?: string
}

const DialogButton = ({
  open,
  setOpen,
  content,
  children,
  asChild = false,
  triggerClassName,
  className,
  footer,
  title,
  topIcon,
  subtitle
}: DialogButtonProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild} className={cn('', triggerClassName)}>
        {children}
      </DialogTrigger>
      <DialogContent className={cn('flex flex-col w-96', className)}>
        <div className='p-3 mr-auto rounded-full glass'>{topIcon}</div>
        {title ? (
          <DialogHeader>
            <DialogTitle className='text-2xl'>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>
        ) : (
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle className='text-2xl'>Title</DialogTitle>
              <DialogDescription>Fix the warning</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
        )}
        {content}
        {footer ? footer : null}
      </DialogContent>
    </Dialog>
  )
}

export default DialogButton
