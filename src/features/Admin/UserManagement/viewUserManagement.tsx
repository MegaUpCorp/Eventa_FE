import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Badge } from 'src/components/ui/badge'
import { MoreHorizontal, Search, UserPlus } from 'lucide-react'
import { useGetListUser } from 'src/features/Admin/UserManagement/useGetListUser'
import { User } from 'src/@types/users.type'

// Define interface for the user list in admin view
interface UserAdmin {
  id: string
  name?: string
  fullName?: string
  email: string
  role?: string
  roleName?: string
  status?: string
  lastActive?: string
  profilePicture?: string
  password?: string
  username?: string
  phoneNumber?: string
  address?: []
  bio?: string
  premium?: boolean
  insDate?: string
  updDate?: string
  delFlg?: boolean
}

type UserListAdmin = UserAdmin[]

// Sample data
const users: UserListAdmin = [
  {
    email: 'hantruong3009@gmail.com',
    username: 'HuynNhan',
    password: 'Han@2003',
    roleName: 'Member',
    fullName: 'Huynh Nhan',
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/hairsalon-588fe.appspot.com/o/f9d1ae28-3394-4055-8e01-3477d6c50f45.jpg?alt=media&token=4e753835-c0e0-41dd-a6aa-334d903a7b67',
    phoneNumber: '0987122299',
    address: [],
    bio: 'Co doc vuong',
    id: '4b635cc5-c20a-4119-9589-2a46333a929a',
    insDate: '2025-02-14T00:47:58.828Z',
    updDate: '2025-02-14T00:47:58.828Z',
    delFlg: false
  },
  {
    email: 'hantruong3009@gmail.com',
    username: 'HuynNhan',
    password: 'Han@2003',
    roleName: 'Member',
    fullName: 'Huynh Nhan',
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/hairsalon-588fe.appspot.com/o/f9d1ae28-3394-4055-8e01-3477d6c50f45.jpg?alt=media&token=4e753835-c0e0-41dd-a6aa-334d903a7b67',
    phoneNumber: '0987122299',
    address: [],
    bio: 'Co doc vuong',
    premium: false,
    id: '4b635cc5-c20a-4119-9589-2a46333a929a',
    insDate: '2025-02-14T00:47:58.828Z',
    updDate: '2025-02-14T00:47:58.828Z',
    delFlg: false
  },
  {
    email: 'hantruong3009@gmail.com',
    username: 'HuynNhan',
    password: 'Han@2003',
    roleName: 'Member',
    fullName: 'Huynh Nhan',
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/hairsalon-588fe.appspot.com/o/f9d1ae28-3394-4055-8e01-3477d6c50f45.jpg?alt=media&token=4e753835-c0e0-41dd-a6aa-334d903a7b67',
    phoneNumber: '0987122299',
    address: [],
    bio: 'Co doc vuong',
    premium: false,
    id: '4b635cc5-c20a-4119-9589-2a46333a929a',
    insDate: '2025-02-14T00:47:58.828Z',
    updDate: '2025-02-14T00:47:58.828Z',
    delFlg: false
  },
  {
    email: 'hantruong3009@gmail.com',
    username: 'HuynNhan',
    password: 'Han@2003',
    roleName: 'Member',
    fullName: 'Huynh Nhan',
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/hairsalon-588fe.appspot.com/o/f9d1ae28-3394-4055-8e01-3477d6c50f45.jpg?alt=media&token=4e753835-c0e0-41dd-a6aa-334d903a7b67',
    phoneNumber: '0987122299',
    address: [],
    bio: 'Co doc vuong',
    premium: false,
    id: '4b635cc5-c20a-4119-9589-2a46333a929a',
    insDate: '2025-02-14T00:47:58.828Z',
    updDate: '2025-02-14T00:47:58.828Z',
    delFlg: false
  }
]

const ViewUserManagement: React.FC<{ userList: UserListAdmin }> = ({ userList }) => {
  console.log(userList)
  return (
    <div className='flex-1 space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Users Management</h2>
        <div className='flex items-center gap-2'>
          <Button variant='outline'>
            <UserPlus className='mr-2 h-4 w-4' />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your application users and their permissions.</CardDescription>
          <div className='flex items-center gap-2 pt-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input type='search' placeholder='Search users...' className='w-full pl-8' />
            </div>
            <Button variant='outline'>Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Phone Number</TableHead>

                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src='' />
                      <AvatarFallback>
                        {user.username?.charAt(0) || ''}
                        {user.username?.split(' ')[1]?.charAt(0) || ''}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-medium'>{user.username}</div>
                      <div className='text-sm text-muted-foreground'>{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.roleName === 'Admin' ? 'default' : user.roleName === 'Organizer' ? 'outline' : 'secondary'
                      }
                    >
                      {user.roleName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.premium ? 'default' : 'destructive'}>
                      {user.premium ? 'Premium' : 'Free'}
                    </Badge>
                  </TableCell>

                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive'>Suspend user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Button variant='outline' size='sm'>
              Previous
            </Button>
            <Button variant='outline' size='sm'>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewUserManagement
