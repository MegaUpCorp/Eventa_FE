import { Card } from 'src/components/ui/card'
import { HeroSearchEventFormProvider } from 'src/features/Events/HeroSearchEvent/HeroSearchEventFormProvider'

export const HeroSection = () => {
  return (
    <div className='flex items-center justify-between relative'>
      {/* Slogan */}
      <div className='flex flex-col justify-start gap-2'>
        <p className='text-6xl font-bold'>Let's</p>
        <p className='text-6xl font-bold'>
          <span className='underline decoration-primary decoration-8 underline-offset-[12px]'>create</span> your
        </p>
        <p className='text-6xl font-bold'>own event</p>
        <p className='text-muted-foreground mr-14'>
          Bring your vision to life! We provide the tools and support to make your event uniquely yours. Let’s create
          your own event!
        </p>
        {/* Search box */}
        <Card className='absolute w-[720px] bottom-0 p-4'>
          <HeroSearchEventFormProvider />
        </Card>
      </div>
      {/* Top 3 popular (weekly, monthly ???) */}
      <div className='flex gap-5'>
        <div className='flex flex-col gap-5'>
          <Card className='p-0.5 w-60 h-56'>
            <img
              src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D'
              alt=''
              className='w-full h-full object-cover rounded-lg'
            />
          </Card>
          <Card className='p-0.5 w-60 h-64'>
            <img
              src='https://as1.ftcdn.net/v2/jpg/05/21/80/52/1000_F_521805294_qSWsJCaI4dHPsSJelJFxuQW4TA7p04lq.jpg'
              alt=''
              className='w-full h-full object-cover rounded-lg'
            />
          </Card>
        </div>
        <Card className='w-60 h-80 p-0.5 mt-16'>
          <img
            src='https://cdn.fs.teachablecdn.com/eYKAprpPRbO4AWvLPf5g'
            alt=''
            className='w-full h-full object-cover rounded-lg'
          />
        </Card>
      </div>
    </div>
  )
}
