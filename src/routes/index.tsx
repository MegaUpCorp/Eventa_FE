import { Route, Routes } from 'react-router-dom'
import { useUserStore } from 'src/config/zustand/UserStore'
import ViewEventsManagementAdmin from 'src/features/Admin/EventsManagementAdmin/ViewEventsManagementAdmin'
import { AdminLayout } from 'src/layout/Admin/AdminLayout'
import {
  AccountVerification,
  CalendarCreation,
  CalendarDetailPage,
  CalendarManagementPage,
  CalendarPage,
  DiscoverPage,
  EventCreation,
  EventListPage,
  EventManagementPage,
  HomePageUser,
  MePage,
  SepayCallbackPage,
  SettingsPage
} from 'src/pages'
import AdminDashboard from 'src/pages/Admin/Dashboard'
import EventsManagement from 'src/pages/Admin/EventsManagement'
import UsersManagement from 'src/pages/Admin/UsersManagement'
import { EventDetail } from 'src/pages/Event/EventDetail'
import EventPayment from 'src/pages/Event/EventPayment'
import MyEventListPage from 'src/pages/Event/MyEventListPage'
import RegisteredEventPage from 'src/pages/Event/RegisteredEventPage'

type RouteType = {
  path: string
  element: JSX.Element
  children?: RouteType[]
}

const eventManagementRoutes = ['', '/overview', '/guests', '/registration', '/blasts', '/insights', '/more']

const settingRoutes = ['', '/account', '/payment']

const calendarManagementRoutes = ['', '/events', '/newsletters', '/insights', '/settings']

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
    path: '/events/payment',
    element: <EventPayment />
  },
  {
    path: '/calendars/:publicUrl',
    element: <CalendarDetailPage />
  },
  {
    path: '/discover',
    element: <DiscoverPage />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboard />
      },
      {
        path: 'users',
        element: <UsersManagement />
      },
      {
        path: 'events',
        element: <EventsManagement />
      },
      {
        path: 'eventadmin',
        element: <ViewEventsManagementAdmin />
      }
    ]
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
  ...settingRoutes.map((route) => ({
    path: `/settings${route}`,
    element: <SettingsPage />
  })),
  ...calendarManagementRoutes.map((route) => ({
    path: `/calendars/manage/:publicUrl${route}`,
    element: <CalendarManagementPage />
  })),
  {
    path: '/events/registered-events',
    element: <RegisteredEventPage />
  },
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
  },
  {
    path: '/oauth/sepay/callback',
    element: <SepayCallbackPage />
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
const adminRoutes: RouteType[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboard />
      },
      {
        path: 'users',
        element: <UsersManagement />
      },
      {
        path: 'events',
        element: <EventsManagement />
      },
      {
        path: 'eventadmin',
        element: <ViewEventsManagementAdmin />
      }
    ]
  }
]
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
      path: 'events/:slug',
      element: <EventDetail />
    }
    // {
    //   path: '*',
    //   element: <Navigate to='/' />
    // }
  ]

  // Hàm đệ quy để tạo các Route của React Router
  const createRoutes = (routes: RouteType[]) => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {createRoutes(route.children)}
          </Route>
        )
      }
      return <Route key={route.path} path={route.path} element={route.element} />
    })
  }

  return <Routes>{createRoutes(router)}</Routes>
}
export default Router
