import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { AccountVerification } from 'src/pages/Auth/AccountVerification'
import { EventCreation } from 'src/pages/Event/EventCreation'
import { EventDetailPageUser, HomePageUser } from 'src/pages';

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
    path: "/event-detail",
    element: <EventDetailPageUser/>
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
  const { isAuthenticated } = useContext(AppContext)
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
