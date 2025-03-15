import { Button } from 'src/components/ui/button'
import { useSubscribe } from './useSubscribe'
import { BellRing } from 'lucide-react'
import { useUnsubscribe } from './useUnsubscribe'

interface SubscriptionButtonProps {
  isSubscribe: boolean
  publicUrl: string
}

const SubscriptionButton = ({ isSubscribe, publicUrl }: SubscriptionButtonProps) => {
  const { mutate: subscribe, isPending: isPendingSub } = useSubscribe()
  const { mutate: unsubscribe, isPending: isPendingUnSub } = useUnsubscribe()

  switch (isSubscribe) {
    case true:
      return (
        <Button
          onClick={() => unsubscribe(publicUrl)}
          variant='secondary'
          className='text-[#ffffff]'
          isLoading={isPendingUnSub}
        >
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
