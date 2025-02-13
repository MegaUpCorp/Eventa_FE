import { CircleCheck, Sparkles } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'

const FREE_PLAN = [
  'Unlimited number of events',
  'Unlimited number of guests per event',
  '5% platform fee for paid events',
  'Send up to 500 invitations per week'
]

const PAID_PLAN = [
  '0% platform fee for paid events',
  'Send up to 1000 invitations per week',
  'Insights and analytics',
  'Check-in manager role for your events',
  'Up to 5 admins for your calendar'
]

export const Pricing = () => {
  return (
    <div className='flex flex-col mt-20 w-full'>
      <p className='text-5xl font-semibold text-center'>Pick your plan and get started</p>
      <p className='text-muted-foreground mt-1 mb-4 text-center px-60'>
        Use Eventa for free with unlimited events and guests. Upgrade for more invites, insights, 0% platform free, and
        more.
      </p>
      <div className='mx-auto w-full'>
        <Tabs defaultValue='monthly'>
          <TabsList className='grid w-60 mx-auto grid-cols-2'>
            <TabsTrigger value='monthly'>Monthly</TabsTrigger>
            <TabsTrigger value='annual'>Annual</TabsTrigger>
          </TabsList>
          <TabsContent value='monthly' className='mt-16'>
            <div className='flex gap-4'>
              <PricingCard
                label={<p className='font-semibold text-lg'>Eventa</p>}
                plan='Free'
                planDescription='Free, forever'
                trigger={
                  <Button variant='secondary' className='mb-8'>
                    Get Started
                  </Button>
                }
                planSubtitle='No credit card required with:'
                features={FREE_PLAN}
              />
              <PricingCard
                label={
                  <div className='flex items-center gap-2'>
                    <Sparkles size={18} className='text-primary' />
                    <p className='font-semibold text-lg text-primary'>Eventa Plus</p>
                  </div>
                }
                plan='399.000 VND'
                planDescription='Per month'
                trigger={<Button className='mb-8 text-white'>Get Eventa Plus</Button>}
                planSubtitle='Everything in the free plan along with:'
                features={PAID_PLAN}
              />
            </div>
          </TabsContent>
          <TabsContent value='annual' className='mt-16'>
            <div className='flex gap-4'>
              <PricingCard
                label={<p className='font-semibold text-lg'>Eventa</p>}
                plan='Free'
                planDescription='Free, forever'
                trigger={
                  <Button variant='secondary' className='mb-8'>
                    Get Started
                  </Button>
                }
                planSubtitle='No credit card required with:'
                features={FREE_PLAN}
              />
              <PricingCard
                label={
                  <div className='flex items-center gap-2'>
                    <Sparkles size={18} className='text-primary' />
                    <p className='font-semibold text-lg text-primary'>Eventa Plus</p>
                  </div>
                }
                plan='259.000 VND'
                planDescription='Per month'
                trigger={<Button className='mb-8 text-white'>Get Eventa Plus</Button>}
                planSubtitle='Everything in the free plan along with:'
                features={PAID_PLAN}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface PricingCardProps {
  label: React.ReactNode
  plan: string
  planDescription: string
  planSubtitle: string
  trigger: React.ReactNode
  features: string[]
}

const PricingCard = ({ label, plan, planDescription, features, trigger, planSubtitle }: PricingCardProps) => {
  return (
    <Card className='p-4 w-full flex flex-col'>
      <div className='mb-3'>{label}</div>
      <p className='text-4xl mb-1'>{plan}</p>
      <p className='mb-3'>{planDescription}</p>
      {trigger}
      <p className='text-muted-foreground font-medium'>{planSubtitle}</p>
      <div className='flex flex-col gap-5 mt-3'>
        {features.map((item, index) => (
          <div key={index} className='flex items-center gap-2.5'>
            <CircleCheck size={20} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
