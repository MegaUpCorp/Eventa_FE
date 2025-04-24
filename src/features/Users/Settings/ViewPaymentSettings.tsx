import http from 'src/utils/http'
import ConnectSepay from './ConnectSepay'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'src/components/ui/card'

interface Order {
  accountID: string
  createdAt: string
  customerEmail: string | null
  customerPhone: string | null
  eventId: string | null
  isManualRefund: boolean
  name: string
  note: string | null
  orderId: string
  orderType: string
  paymentMethod: string
  paymentStatus: string
  qrCode: string | null
  refundDate: string | null
  refundReason: string | null
  status: string | null
  subscriptionPlanId: string
  total: number
  profilePicture: string
  location: {
    id: string
    name: string
    address: string
    longitude: number
    latitude: number
  }
  transactions: {
    accountNumber: string
    accumulated: number
    amount: number
    amountIn: number
    amountOut: number
    bank: string
    code: string
    createdAt: string
    delFlg: false
    description: string
    eventId: null
    gateway: null
    id: string
    insDate: string
    orderId: string
    referenceCode: string
    referenceNumber: number | null
    subAccount: string
    subscriptionPlanId: string
    transactionContent: string
    transactionDate: string
    updDate: string
  }[]
}

const ViewPaymentSettings = () => {
  const { isSepayAuthenticated } = useUserStore()
  const { user } = useUserStore()
  const { data } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data } = await http.get<Order[]>('SepayAuth/getOrderAndTransactionOfMe')
      return data
    }
  })

  return (
    <div>
      <div className='flex flex-col gap-1 my-3'>
        <p className='font-semibold text-xl'>Payments Methods</p>
        <p className='text-muted-foreground'>Your saved payments methods are encrypted and stored securely by SePay</p>
      </div>
      <ConnectSepay />
      {!isSepayAuthenticated ? (
        <div className='flex flex-col gap-2 mt-4'>
          {data?.map((order) => (
            <Card key={order.orderId} className='p-2 flex items-center gap-4'>
              {order.orderType === 'Event' && (
                <img src={order.profilePicture} alt='profilePicture' className='w-32 h-32 rounded-lg' />
              )}
              {order.orderType === 'Subscription' && (
                <div className='w-32 h-32 bg-amber-400 rounded-lg flex justify-center items-center'>
                  <p className='font-medium text-black'>Premium</p>
                </div>
              )}
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-xl'>{order.name}</p>
                {order.orderType === 'Event' && (
                  <p className='text-muted-foreground text-sm'>Location: {order.location.address}</p>
                )}
                <p className='text-emerald-500 font-semibold text-xl'>{order.total} VND</p>
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ViewPaymentSettings
