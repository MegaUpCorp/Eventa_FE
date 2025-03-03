import { HeroSection } from 'src/components/HomePage/HeroSection/HeroSection'
import { Pricing } from 'src/components/HomePage/Pricing/Pricing'
import { Solutions } from 'src/components/HomePage/Solutions/Solutions'

const HomePage = () => {
  return (
    <div className='container-lg flex flex-col p-4'>
      <HeroSection />
      <Solutions />
      <Pricing />
    </div>
  )
}
export default HomePage
