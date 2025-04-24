import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { useUserStore } from 'src/config/zustand/UserStore'
import { useExchangeCode } from 'src/features/Auth/SePay/useExchangeCode'

const SepayCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const localState = localStorage.getItem('oauth-state')

  const isValid = Boolean(code && localState && state === localState)
  const { data, isLoading, isError } = useExchangeCode(code, isValid)
  const { sePayLogin } = useUserStore()

  useEffect(() => {
    if (!isValid) {
      navigate('/')
    }

    if (data) {
      const {
        token: { access_token, refresh_token }
      } = data
      localStorage.removeItem('oauth-state')
      sePayLogin(access_token, refresh_token)
      navigate('/')
    }
  }, [data, navigate, isValid])

  if (isLoading) return <div className='w-full h-screen flex justify-center items-center'>Exchanging code...</div>

  if (isError)
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center gap-4'>
        <p className='text-xl font-medium'>OAuth failed. Try again.</p>
        <Button className='text-white' onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    )

  return null
}

export default SepayCallback
