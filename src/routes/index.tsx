import { Navigate, Route, Routes } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import { EventDetailPageUser, HomePageUser } from 'src/pages'
import { AccountVerification } from 'src/pages/Auth/AccountVerification'
import { EventCreation } from 'src/pages/Event/EventCreation'

type RouteType = {
  path: string
  element: JSX.Element
}

const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <HomePageUser />
  },
  {
    path: 'verify-account',
    element: <AccountVerification />
  },
  {
    path: 'events/event-detail',
    element: <EventDetailPageUser />
  },
  {
    path: '/events/create',
    element: <EventCreation />
  }
]
//
const authenicatedRoutes: RouteType[] = [
  {
    path: '/events/create',
    element: <EventCreation />
  }
]
//
const unAuthenticatedRoute: RouteType[] = []
//admin Route
const adminRoutes: RouteType[] = []
//staff Route
const staffRoutes: RouteType[] = []

const Router = () => {
  const { isAuthenticated } = useUserStore()
  const user = JSON.parse(localStorage.getItem('profile') || '{}')
  const router = [
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(['ADMIN'].includes(user.scope) ? adminRoutes : []),
    ...(['STAFF'].includes(user.scope) ? staffRoutes : []),

    {
      path: '*',
      element: <Navigate to='/' />
    }
  ]
  return (
    <Routes>
      {router.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}
export default Router
