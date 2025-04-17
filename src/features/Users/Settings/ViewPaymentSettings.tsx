import { Radio } from 'lucide-react'
import { Button } from 'src/components/ui/button'

const SCOPES = 'bank-account:read transaction:read webhook:write profile'
const AUTH_URL = 'https://my.sepay.vn/oauth/authorize'

const generateState = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const ViewPaymentSettings = () => {
  const isLoggedIn = Boolean(localStorage.getItem('sepay-access-token'))

  const handleRedirect = () => {
    const state = generateState()
    const url = `${AUTH_URL}?response_type=code&client_id=${import.meta.env.VITE_SEPAY_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SEPAY_REDIRECT_URI}&scope=${SCOPES}&state=${state}`
    localStorage.setItem('oauth-state', state)
    window.location.replace(url)
  }

  return (
    <div>
      <div className='flex flex-col gap-1 my-3'>
        <p className='font-semibold text-xl'>Payments Methods</p>
        <p className='text-muted-foreground'>Your saved payments methods are encrypted and stored securely by SePay</p>
      </div>
      {!isLoggedIn ? (
        <Button className='text-white' onClick={handleRedirect}>
          <Radio />
          Connect SePay
        </Button>
      ) : null}
    </div>
  )
}

export default ViewPaymentSettings
