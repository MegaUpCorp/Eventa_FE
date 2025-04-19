import { Clock, DollarSign, GitCommitVertical, Tag, Ticket, UserRoundCheck } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from 'src/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from 'src/components/ui/select'
import { Separator } from 'src/components/ui/separator'
const chartData = [
  { month: '2024-07-15', desktop: 186, mobile: 80 },
  { month: '2024-07-16', desktop: 305, mobile: 200 },
  { month: '2024-07-17', desktop: 237, mobile: 120 },
  { month: '2024-07-18', desktop: 73, mobile: 190 },
  { month: '2024-07-19', desktop: 209, mobile: 130 },
  { month: '2024-07-20', desktop: 214, mobile: 140 }
]
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig
const ViewCalendarInsights = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <div className='flex items-center text-muted-foreground'>
            <Ticket className='size-4 mr-1' />
            <p className='font-medium'>Events</p>
          </div>
          <p className='font-medium text-xl'>5</p>
          <p className='font-medium text-muted-foreground'>0 last week</p>
        </div>
        <div className='flex flex-col items-start'>
          <div className='flex items-center text-muted-foreground'>
            <Tag className='size-4 mr-1' />
            <p className='font-medium'>Tickets</p>
          </div>
          <p className='font-medium text-xl'>0</p>
          <p className='font-medium text-muted-foreground'>0 last week</p>
        </div>
        <div className='flex flex-col items-start'>
          <div className='flex items-center text-muted-foreground'>
            <UserRoundCheck className='size-4 mr-1' />
            <p className='font-medium'>Subscribers</p>
          </div>
          <p className='font-medium text-xl'>0</p>
          <p className='font-medium text-muted-foreground'>0 last week</p>
        </div>
        <div className='flex flex-col items-start'>
          <div className='flex items-center text-muted-foreground'>
            <DollarSign className='size-4 mr-1' />
            <p className='font-medium'>Sales</p>
          </div>
          <p className='font-medium text-xl'>0</p>
          <p className='font-medium text-muted-foreground'>$0 last week</p>
        </div>
      </div>
      <Separator className='my-10' />
      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col'>
          <p className='font-semibold text-xl'>Page Views</p>
          <p className='text-muted-foreground mb-4'>See recent page views of the calendar page.</p>
        </div>
        <Select defaultValue='p7d'>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Select a date' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value='p7d'>Past 7 Days</SelectItem>
              <SelectItem value='p30d'>Past 30 Days</SelectItem>
              <SelectItem value='p3m'>Past 3 Months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription className='flex items-center gap-1 mt-2'>
            <Clock className='size-4' />
            Past 7 Days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='h-40 w-full'>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    weekday: 'short'
                  })
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey='desktop'
                type='natural'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24
                  return (
                    <GitCommitVertical
                      key={payload.month}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill='hsl(var(--background))'
                      stroke='var(--color-desktop)'
                    />
                  )
                }}
              />
            </LineChart>
          </ChartContainer>
          <div className='mt-4'>
            <p className='font-semibold'>Page Views</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewCalendarInsights
