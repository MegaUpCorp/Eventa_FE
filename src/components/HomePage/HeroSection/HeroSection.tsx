import { Card } from 'src/components/ui/card'
import { HeroSearchEventFormProvider } from 'src/features/Events/HeroSearchEvent/HeroSearchEventFormProvider'

export const HeroSection = () => {
  return (
    <div className='flex items-center justify-between relative'>
      {/* Slogan */}
      <div className='flex flex-col justify-start gap-3'>
        <p className='text-6xl font-semibold'>Let&apos;s</p>
        <p className='text-6xl font-semibold'>
          <span className='underline decoration-primary decoration-8 underline-offset-[10px]'>create</span> your
        </p>
        <p className='text-6xl font-semibold'>own event</p>
        <p className='text-muted-foreground mr-16'>
          Bring your vision to life! We provide the tools and support to make your event uniquely yours.
        </p>
        {/* Search box */}
        <Card className='absolute w-[600px] bottom-5 p-4 glass'>
          <HeroSearchEventFormProvider />
        </Card>
      </div>
      {/* Top 3 popular (weekly, monthly ???) */}
      <div className='flex gap-4'>
        <div className='flex flex-col gap-4'>
          <Card className='p-0.5 w-52 h-56'>
            <img
              src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/et/c50ed22a-27fd-4c0c-a48d-8727c4fee8c8.jpg'
              alt=''
              className='w-full h-full object-cover rounded-lg'
            />
          </Card>
          <Card className='p-0.5 w-52 h-64'>
            <img
              src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/w6/7d36fe28-b709-4202-ba0a-0cdaefd1d0f7.png'
              alt=''
              className='w-full h-full object-cover rounded-lg'
            />
          </Card>
        </div>
        <Card className='w-52 h-72 p-0.5 mt-16'>
          <img
            src='https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/ns/4abdf646-ba26-4c42-a819-079cc3d6bdec.jpg'
            alt=''
            className='w-full h-full object-cover rounded-lg'
          />
        </Card>
      </div>
    </div>
  )
}
