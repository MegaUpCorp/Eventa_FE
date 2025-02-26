import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from 'src/config/zustand/AuthStore'
import { useSignUp } from 'src/features/Auth/SignUp/useSignUp'

const AccountVerification = () => {
  const { setIsOpenDialog, setState } = useAuthStore()
  const { verifyTokenMutation } = useSignUp()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) return

    verifyTokenMutation.mutateAsync(token).then(({ data }) => {
      if (data) {
        setState('enter-information')
        setIsOpenDialog(true)
      }
    })
  }, [token, setState, setIsOpenDialog])

  if (!token) {
    return <Navigate to='/' replace />
  }

  return <Navigate to='/' replace />
}

export default AccountVerification
