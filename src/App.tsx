// import { ToastContainer } from 'react-toastify'
import useLayout from './hooks/useLayout'
// import { useNavigate } from 'react-router-dom'
// import NavBar from './layouts/user/NavBar'
import Router from './routes'
import { Footer, NavBar } from './layout'
import { StrictMode } from 'react'

function App() {
  const layout = useLayout()
  // const nav = useNavigate()
  // const primaryColor = '#1a120d'

  return (
    <StrictMode>
      {/* <ToastContainer autoClose={2000} style={{ padding: '20px' }} /> */}
      <div className='main relative'>
        {layout.includes('navbar') && <NavBar />}
        {/* <div
          className='absolute inset-0 w-full h-full'
          style={{
            backgroundImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 0%, 
            ${primaryColor} 10%, 
            ${primaryColor} 100%
          )`
          }}
        /> */}
        <div className='relative z-10 '>
          <Router />
        </div>
        {layout.includes('footer') && <Footer />}
        {layout.includes('chat') && ''}
      </div>
    </StrictMode>
  )
}

export default App
