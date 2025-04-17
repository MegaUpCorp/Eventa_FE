import { ChevronDown, ChevronRight, Clock } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { Button } from 'src/components/ui/button'
import { AreaChartComponent } from 'src/components/ui/area-chart'
import { cn } from 'src/lib/utils'

const ViewEventInsights = () => {
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d')
  
  // Mock data for page views
  const pageViewsData = {
    '24h': 10,
    '7d': 30,
    '30d': 65
  }
  
  // Mock data for chart based on time filter
  const chartData = useMemo(() => {
    if (timeFilter === '24h') {
      return Array.from({ length: 24 }, (_, i) => ({
        date: `${i}h`,
        Views: Math.floor(Math.random() * 5) + 1
      }))
    } else if (timeFilter === '7d') {
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          Views: Math.floor(Math.random() * 10) + 2
        }
      })
    } else {
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        return {
          date: `${date.getDate()}/${date.getMonth() + 1}`,
          Views: Math.floor(Math.random() * 8) + 1
        }
      })
    }
  }, [timeFilter])
  
  // Mock data for top visitors
  const topVisitorsData = [
    { location: 'Ho Chi Minh City, VN', percentage: 30 },
    { location: 'Ha Noi, VN', percentage: 25 },
    { location: 'Da Nang City, VN', percentage: 20 },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">See recent page views of the event page.</h2>
        
        {/* Page Views Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-[#0E1218] border-[#1E2530] shadow-lg overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Page Views</h3>
              <div className="flex items-center rounded-full bg-[#121B29] p-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setTimeFilter('24h')}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                    timeFilter === '24h' 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  24 hours
                </Button>
                <Button 
                  variant="ghost"
                  size="sm" 
                  onClick={() => setTimeFilter('7d')}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                    timeFilter === '7d' 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  7 days
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setTimeFilter('30d')}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                    timeFilter === '30d' 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  30 days
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <h3 className="text-4xl font-bold mr-3 text-white">{pageViewsData[timeFilter]}</h3>
                <div className="flex items-center px-2 py-1 rounded-md bg-green-500/10 text-green-400">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  <span className="text-xs font-medium">2.5%</span>
                </div>
              </div>
              
              {/* Chart using Shadcn Area Chart */}
              <div className="mt-2 h-[220px]">
                <AreaChartComponent
                  data={chartData}
                  index="date"
                  categories={["Views"]}
                  colors={["blue"]}
                  className="h-full bg-transparent"
                  valueFormatter={(value) => `${value} views`}
                />
              </div>
            </div>
          </Card>
          
          {/* Top Visitors Card */}
          <Card className="p-6 bg-[#0E1218] border-[#1E2530] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Top Visitors</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last 7 days</span>
              </div>
            </div>
            
            <div className="space-y-8">
              {topVisitorsData.map((visitor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{visitor.location}</span>
                    <span className="text-sm text-blue-400 font-medium">{visitor.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1E2530] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${visitor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" size="sm" className="flex items-center text-blue-400 hover:text-blue-300 pl-0">
                <span>View all locations</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Separator className="bg-[#1E2530]" />
      
      {/* Event Feedback Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Event Feedback</h2>
        <p className="text-gray-400 mb-4">See how much your guests enjoyed the event.</p>
        
        <Card className="p-6 bg-[#0E1218] border-[#1E2530] shadow-lg">
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-lg text-center text-gray-400">
              {timeFilter === '24h'
                ? 'No feedback collected yet for the last 24 hours'
                : timeFilter === '7d'
                  ? 'No feedback collected yet for the last 7 days'
                  : 'No feedback collected yet for the last 30 days'}
            </p>
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white border-none">
              Send Blast
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ViewEventInsights
