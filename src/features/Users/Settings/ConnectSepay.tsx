import { Radio } from 'lucide-react'
import { Button, ButtonProps } from 'src/components/ui/button'
import { useUserStore } from 'src/config/zustand/UserStore'

const SCOPES = 'bank-account:read transaction:read webhook:write profile'
const AUTH_URL = 'https://my.sepay.vn/oauth/authorize'

const generateState = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const ConnectSepay = (props: ButtonProps) => {
  const { isSepayAuthenticated } = useUserStore()

  const handleRedirect = () => {
    const state = generateState()
    const url = `${AUTH_URL}?response_type=code&client_id=${import.meta.env.VITE_SEPAY_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SEPAY_REDIRECT_URI}&scope=${SCOPES}&state=${state}`
    localStorage.setItem('oauth-state', state)
    window.location.replace(url)
  }

  return (
    <>
      {!isSepayAuthenticated ? (
        <Button className='text-white' {...props} onClick={handleRedirect}>
          <Radio />
          Connect SePay
        </Button>
      ) : null}
    </>
  )
}

export default ConnectSepay
