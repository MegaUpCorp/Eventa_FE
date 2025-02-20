import ViewCalendars from 'src/features/Calendars/ViewCalendars/ViewCalendars'
import { Separator } from 'src/components/ui/separator'

const calendars = [
  {
    id: 1,
    name: 'Reading Rhythms Global',
    profile:
      'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,anim=false,background=white,quality=75,width=1250,height=357.14285714285717/calendar-cover-images/ek/ee1229b4-c323-46d9-8778-ad1260a05d03',
    subscribers: 10
  },
  {
    id: 2,
    name: 'Her Workplace',
    profile:
      'https://media.istockphoto.com/id/1370189361/vector/abstract-blast-excitement-explosion-lightning-bolt-patriotic-background.jpg?s=612x612&w=0&k=20&c=xt53460_zzeqNzXX27QeXzwklNkmaaP5dovZbol_mwo=',
    subscribers: 20
  },
  {
    id: 3,
    name: 'The GenAI Collective',
    profile: 'https://cdn.pixabay.com/photo/2020/03/17/14/59/illustration-4940622_1280.jpg',
    subscribers: 0
  }
]

const CalendarPage = () => {
  return (
    <div className='container-base flex flex-col gap-4 px-4'>
      <p className='text-3xl font-semibold mb-4'>Calendars</p>
      <ViewCalendars calendars={calendars} type='owned' />
      <Separator className='my-4' />
      <ViewCalendars calendars={[]} type='subscribed' />
    </div>
  )
}

export default CalendarPage
