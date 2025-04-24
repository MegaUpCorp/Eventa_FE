import { useNavigate } from 'react-router-dom'
import { HeroSection } from 'src/components/HomePage/HeroSection/HeroSection'
import { Pricing } from 'src/components/HomePage/Pricing/Pricing'
import { Solutions } from 'src/components/HomePage/Solutions/Solutions'
import { useUserStore } from 'src/config/zustand/UserStore'

const HomePage = () => {
  const {user} = useUserStore()
  const nagivate = useNavigate()
  if(user?.role === "ADMIN") nagivate('/admin')

  return (
    <div className='container-lg flex flex-col p-4'>
      <HeroSection />
      <Solutions />
      <Pricing />
    </div>
  )
}
export default HomePage
