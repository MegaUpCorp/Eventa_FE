import ConnectSepay from './ConnectSepay'

const ViewPaymentSettings = () => {
  return (
    <div>
      <div className='flex flex-col gap-1 my-3'>
        <p className='font-semibold text-xl'>Payments Methods</p>
        <p className='text-muted-foreground'>Your saved payments methods are encrypted and stored securely by SePay</p>
      </div>
      <ConnectSepay />
    </div>
  )
}

export default ViewPaymentSettings
