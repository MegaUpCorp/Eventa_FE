import { LoginDialog } from 'src/components/AuthDialog'
import { ModeToggle } from 'src/components/ModeToggle'

export const Home = () => {
  return (
    <div>
      <LoginDialog />
      <ModeToggle />
    </div>
  )
}
