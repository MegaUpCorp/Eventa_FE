import { Label } from '../ui/label'

export const AuthHeader = ({ title }: { title: string }) => {
  return (
    <div className='flex flex-col gap-2 mb-10'>
      <Label className='block text-3xl font-bold'>{title}</Label>
      <Label className='text-sm font-normal'>
        By continuing, you agree to our <Label className='text-primary font-bold'>User Agreement</Label> and acknowledge
        that you understand the <Label className='text-primary font-bold'>Privacy Policy</Label>.
      </Label>
    </div>
  )
}
