import { AppProvider } from './context/app.context'
import { ToastContainer } from 'react-toastify'
import useLayout from './hooks/useLayout'
// import { useNavigate } from 'react-router-dom'
// import NavBar from './layouts/user/NavBar'
import Router from './routes'
import { Footer, NavBar } from './layout'
import { StrictMode } from 'react'

function App() {
  const layout = useLayout()
  // const nav = useNavigate()

  return (
    <StrictMode>
  
        <AppProvider>
          <ToastContainer autoClose={2000} style={{ padding: '20px' }} />
          {layout.includes('navbar') && <NavBar />}
          <div className=''>
            <div className='main'>
              <Router />
            </div>
          </div>
          {layout.includes('footer') && <Footer />}
          {layout.includes('chat') && ''}
        </AppProvider>

    </StrictMode>
  )
}

export default App
