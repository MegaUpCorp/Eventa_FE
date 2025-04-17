import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
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

  useEffect(() => {
    if (!isValid) {
      navigate('/')
    }
  }, [isValid, navigate])

  useEffect(() => {
    if (data) {
      const {
        token: { access_token, refresh_token }
      } = data
      localStorage.removeItem('oauth-state')
      localStorage.setItem('sepay-access-token', access_token)
      localStorage.setItem('sepay-refresh-token', refresh_token)
      navigate('/settings/payment')
    }
  }, [data, navigate])

  if (isLoading) return <div className='w-full h-screen flex justify-center items-center'>Exchanging code...</div>

  if (isError)
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center gap-4'>
        <p className='text-xl font-medium'>OAuth failed. Try again.</p>
        <Button className='text-white' onClick={() => navigate('/settings/payment')}>
          Back to Home
        </Button>
      </div>
    )

  return null
}

export default SepayCallback
