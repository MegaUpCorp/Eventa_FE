import { useLocation } from 'react-router-dom'

type Width = 780 | 820 | 960

const smWidthRoutes = [''] // 780px

const lgWidthRoutes = ['/', '/events/create'] // 960px

export const useDynamicWidth = (): Width => {
  const { pathname } = useLocation()

  if (smWidthRoutes.includes(pathname)) {
    return 780
  } else if (lgWidthRoutes.includes(pathname)) {
    return 960
  } else {
    return 820
  }
}
