import { Button } from 'src/components/ui/button'
import { useSubscribe } from './useSubscribe'
import { BellRing } from 'lucide-react'

interface SubscriptionButtonProps {
  isSubscribe: boolean
  publicUrl: string
}

const SubscriptionButton = ({ isSubscribe, publicUrl }: SubscriptionButtonProps) => {
  const { mutate: subscribe, isPending: isPendingSub } = useSubscribe()

  switch (isSubscribe) {
    case true:
      return (
        <Button variant='secondary' className='text-[#ffffff]'>
          <BellRing />
          Unsubscribe
        </Button>
      )
    default:
      return (
        <Button onClick={() => subscribe(publicUrl)} className='text-[#ffffff]' isLoading={isPendingSub}>
          Subscribe
        </Button>
      )
  }
}

export default SubscriptionButton
