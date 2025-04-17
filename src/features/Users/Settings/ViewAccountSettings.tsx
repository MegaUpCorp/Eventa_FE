import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { useUserStore } from 'src/config/zustand/UserStore'

const ViewAccountSettings = () => {
  const { user } = useUserStore()

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-1 my-3'>
        <p className='font-semibold text-xl'>Your Profile</p>
        <p className='text-muted-foreground'>Choose how you are displayed as a host or guest</p>
      </div>
      <div className='w-full grid grid-cols-12 gap-10'>
        <div className='flex flex-col gap-4 my-4 col-span-6'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' value={user?.email || ''} readOnly />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' value={user?.username || ''} readOnly />
          </div>
        </div>
        <div className='col-span-6 flex items-center'>
          <Avatar className='w-28 h-28'>
            <AvatarImage src={user?.profilePicture || ''} alt={user?.username} />
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default ViewAccountSettings
