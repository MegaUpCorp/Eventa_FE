import { CircleUserRound } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'src/components/ui/dialog'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { LoginTab } from './LoginTab'
import { RegisterTab } from './RegisterTab'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const AUTH_TABS = ['login', 'register']

export const AuthDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>
          <CircleUserRound />
          Join us now
        </Button>
      </DialogTrigger>
      <DialogContent className='[&>button]:hidden min-h-96'>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Auth</DialogTitle>
            <DialogDescription>Fixed the warning</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <Tabs defaultValue={AUTH_TABS[0]}>
          <TabsList className='w-full'>
            <TabsTrigger value={AUTH_TABS[0]} className='w-full'>
              Login
            </TabsTrigger>
            <TabsTrigger value={AUTH_TABS[1]} className='w-full'>
              Create new account
            </TabsTrigger>
          </TabsList>
          <TabsContent value={AUTH_TABS[0]}>
            <LoginTab />
          </TabsContent>
          <TabsContent value={AUTH_TABS[1]}>
            <RegisterTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
