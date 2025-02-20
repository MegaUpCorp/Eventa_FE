import { Navigate, Route, Routes } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import {
  AccountVerification,
  CalendarCreation,
  CalendarPage,
  EventCreation,
  EventDetailPageUser,
  HomePageUser
} from 'src/pages'

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
  }
]
//
const authenicatedRoutes: RouteType[] = [
  {
    path: '/events/create',
    element: <EventCreation />
  },
  {
    path: '/calendars/create',
    element: <CalendarCreation />
  },
  {
    path: '/calendars',
    element: <CalendarPage />
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
