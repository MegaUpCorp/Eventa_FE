import { useLocation } from 'react-router-dom'

type Width = 780 | 820 | 960

const smWidthRoutes = [''] // 780px

const lgWidthRoutes = ['/', '/events/create'] // 960px

const lgWidthRegex = [/^\/calendars\/\d+$/]

const useMatchesRoute = (currentPath: string, routes: string[], regexes: RegExp[] = []) => {
  return routes.includes(currentPath) || regexes.some((regex) => regex.test(currentPath))
}

export const useDynamicWidth = (): Width => {
  const { pathname } = useLocation()

  if (useMatchesRoute(pathname, smWidthRoutes)) return 780
  if (useMatchesRoute(pathname, lgWidthRoutes, lgWidthRegex)) return 960
  return 820
}
