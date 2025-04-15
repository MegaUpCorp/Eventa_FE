import { ArrowDownIcon, ArrowRightIcon, Clock } from 'lucide-react'
import { useState } from 'react'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { Button } from 'src/components/ui/button'
import { Badge } from 'src/components/ui/badge'

const ViewEventInsights = () => {
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d')
  
  // Mock data for page views
  const pageViewsData = {
    '24h': 10,
    '7d': 30,
    '30d': 65
  }
  
  // Mock data for top visitors
  const topVisitorsData = [
    { location: 'Ho Chi Minh City, VN', percentage: 30 },
    { location: 'Ha Noi, VN', percentage: 25 },
    { location: 'Da Nang City, VN', percentage: 20 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">See recent page views of the event page.</h2>
        
        {/* Page Views Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Card className="p-6 backdrop-blur-sm border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Page Views</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant={timeFilter === '24h' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTimeFilter('24h')}
                  className={timeFilter === '24h' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                >
                  24 hours
                </Button>
                <Button 
                  variant={timeFilter === '7d' ? 'default' : 'ghost'}
                  size="sm" 
                  onClick={() => setTimeFilter('7d')}
                  className={timeFilter === '7d' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                >
                  7 days
                </Button>
                <Button 
                  variant={timeFilter === '30d' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setTimeFilter('30d')}
                  className={timeFilter === '30d' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                >
                  30 days
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <h3 className="text-2xl font-semibold mr-2">{pageViewsData[timeFilter]}</h3>
                <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white">
                  <div className="flex items-center">
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                    <span>2.5%</span>
                  </div>
                </Badge>
              </div>
              
              {/* Chart visualization */}
              <div className="relative h-64 w-full mt-4 border-t border-l border-white/10">
                {/* Y-axis labels */}
                <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>
                
                {/* Chart content - simplified version */}
                <div className="absolute inset-0 flex items-end justify-around pt-4">
                  {/* Placeholder for the chart bars */}
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="relative w-8">
                      <div 
                        className="w-6 bg-gradient-to-t from-blue-400/30 to-green-400/30 rounded-t-sm mx-auto"
                        style={{ 
                          height: `${Math.random() * 70 + 10}%`,
                          minHeight: '10%'
                        }}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                        {timeFilter === '24h' 
                          ? `${index * 4}h` 
                          : timeFilter === '7d' 
                            ? `Day ${index + 1}` 
                            : `Week ${index + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Line chart overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <path
                      d="M 30,150 L 80,100 L 130,120 L 180,80 L 230,90 L 280,60 L 330,70"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C6FFDD" />
                        <stop offset="50%" stopColor="#FBD786" />
                        <stop offset="100%" stopColor="#F7797D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Top Visitors Card */}
          <Card className="p-6 backdrop-blur-sm border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Top Visitors</h3>
              <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last 7 days</span>
              </Button>
            </div>
            
            <div className="space-y-6">
              {topVisitorsData.map((visitor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{visitor.location}</span>
                    <span className="text-sm text-muted-foreground">{visitor.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full"
                      style={{ width: `${visitor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" size="sm" className="flex items-center text-primary mt-4">
                <span>View all locations</span>
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {/* Event Feedback Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Event Feedback</h2>
        <p className="text-muted-foreground mb-4">See how much your guests enjoyed the event.</p>
        
        <Card className="p-6 backdrop-blur-sm border border-white/10 bg-white/5">
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-lg text-center text-muted-foreground">
              {timeFilter === '24h'
                ? 'No feedback collected yet for the last 24 hours'
                : timeFilter === '7d'
                  ? 'No feedback collected yet for the last 7 days'
                  : 'No feedback collected yet for the last 30 days'}
            </p>
            <Button className="mt-4 bg-white/10 hover:bg-white/20 text-white">
              Send Blast
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ViewEventInsights
