import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from 'src/config/zustand/auth-store'

export const AccountVerification = () => {
  const { setIsOpenDialog, setState } = useAuthStore()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) return

    // TODO: Call API to verify the token
    const isValid = true

    if (isValid) {
      setState('enter-information')
      setIsOpenDialog(true)
    }
  }, [token, setState, setIsOpenDialog])

  if (!token) {
    return <Navigate to='/' replace />
  }

  return <Navigate to='/' replace />
}
