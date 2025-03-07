import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useLayout = () => {
  const path = useLocation().pathname
  const [layout, setLayout] = useState<string[]>([])

  useEffect(() => {
    if (path.startsWith('/admin')) {
      setLayout(['admin'])
    } else if (['/verify-account', '/404'].includes(path)) {
      setLayout(['none'])
    } else if (['/events/create', '/calendars/create', '/me', '/404'].includes(path)) {
      setLayout(['navbar'])
    } else {
      setLayout(['navbar', 'footer', 'chat'])
      if (path !== '/' && !path.startsWith('/me') && !path.startsWith('/order-success') && !path.startsWith('/blog')) {
        setLayout((prev) => [...prev, 'breadcrumb'])
      }
    }
  }, [path])
  return layout
}

export default useLayout
