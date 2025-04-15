import { Navigate, Route, Routes } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import {
  AccountVerification,
  CalendarCreation,
  CalendarDetailPage,
  CalendarPage,
  DiscoverPage,
  EventCreation,
  EventListPage,
  EventManagementPage,
  CalendarManagementPage,
  // EventDetailPageUser,
  HomePageUser,
  MePage
} from 'src/pages'
import { EventDetail } from 'src/pages/Event/EventDetail'
import MyEventListPage from 'src/pages/Event/MyEventListPage'

type RouteType = {
  path: string
  element: JSX.Element
}

const eventManagementRoutes = ['', '/overview', '/guests', '/registration', '/blasts', '/insights', '/more']

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
    path: 'events',
    element: <EventListPage />
  },
  
  {
    path: 'events/:slug',
    element: <EventDetail />
  },
  {
    path: '/calendars/:publicUrl',
    element: <CalendarDetailPage />
  },
  {
    path: '/calendars/manage/:slug',
    element: <CalendarManagementPage />
  },
  {
    path: '/discover',
    element: <DiscoverPage />
  }
]
//
const authenicatedRoutes: RouteType[] = [
  {
    path: '/events/create',
    element: <EventCreation />
  },
  ...eventManagementRoutes.map((route) => ({
    path: `/events/manage/:slug${route}`,
    element: <EventManagementPage />
  })),
  {
    path: '/events/my-events',
    element: <MyEventListPage />
  },
  {
    path: '/calendars/create',
    element: <CalendarCreation />
  },
  {
    path: '/calendars',
    element: <CalendarPage />
  },
  {
    path: '/me',
    element: <MePage />
  }
]
//
const unAuthenticatedRoute: RouteType[] = [
  {
    path: '/events/create',
    element: <EventCreation />
  }
]
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
