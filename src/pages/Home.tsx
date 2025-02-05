import { LoginDialog } from 'src/components/Auth/AuthDialog'
import { ModeToggle } from 'src/components/ModeToggle'

export const Home = () => {
  return (
    <div>
      <LoginDialog />
      <ModeToggle />
    </div>
  )
}
