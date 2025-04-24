import {
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  ShoppingCart,
  Store,
  Target,
  Layers,
  CircleUserRound,
  TrendingUp,
  Heart,
  RefreshCw
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'
import { Button } from 'src/components/ui/button'
import { AreaChartComponent } from 'src/components/ui/area-chart'
import { cn } from 'src/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Progress } from 'src/components/ui/progress'

const ViewEventInsights = () => {
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d')
  const [activeTab, setActiveTab] = useState('overview')

  const pageViewsData = {
    '24h': Math.floor(Math.random() * 20) + 5,
    '7d': Math.floor(Math.random() * 50) + 20,
    '30d': Math.floor(Math.random() * 100) + 50
  }

  const chartData = useMemo(() => {
    if (timeFilter === '24h') {
      return Array.from({ length: 24 }, (_, i) => ({
        date: `${i}h`,
        Views: Math.floor(Math.random() * 10) + 1
      }))
    } else if (timeFilter === '7d') {
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          Views: Math.floor(Math.random() * 20) + 5
        }
      })
    } else {
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        return {
          date: `${date.getDate()}/${date.getMonth() + 1}`,
          Views: Math.floor(Math.random() * 15) + 3
        }
      })
    }
  }, [timeFilter])

  const topVisitorsData = [
    { location: 'Ho Chi Minh City, VN', percentage: Math.floor(Math.random() * 40) + 20 },
    { location: 'Ha Noi, VN', percentage: Math.floor(Math.random() * 30) + 15 },
    { location: 'Da Nang City, VN', percentage: Math.floor(Math.random() * 25) + 10 }
  ].slice(0, 3)

  const consumerPreferencesData = [
    { category: 'Fashion & Accessories', percentage: Math.floor(Math.random() * 30) + 20 },
    { category: 'Food & Beverage', percentage: Math.floor(Math.random() * 25) + 15 },
    { category: 'Electronics', percentage: Math.floor(Math.random() * 20) + 10 },
    { category: 'Home Decor', percentage: Math.floor(Math.random() * 15) + 5 },
    { category: 'Books & Stationery', percentage: Math.floor(Math.random() * 10) + 3 }
  ]

  const audienceDemographicsData = {
    age: [
      { group: '18-24', percentage: Math.floor(Math.random() * 30) + 20 },
      { group: '25-34', percentage: Math.floor(Math.random() * 30) + 25 },
      { group: '35-44', percentage: Math.floor(Math.random() * 20) + 10 },
      { group: '45-54', percentage: Math.floor(Math.random() * 10) + 5 },
      { group: '55+', percentage: Math.floor(Math.random() * 5) + 3 }
    ],
    gender: [
      { type: 'Female', percentage: Math.floor(Math.random() * 40) + 40 },
      { type: 'Male', percentage: Math.floor(Math.random() * 35) + 15 },
      { type: 'Other', percentage: Math.floor(Math.random() * 5) + 1 }
    ],
    interests: [
      { name: 'Technology', percentage: Math.floor(Math.random() * 30) + 50 },
      { name: 'Travel', percentage: Math.floor(Math.random() * 25) + 40 },
      { name: 'Fitness', percentage: Math.floor(Math.random() * 20) + 30 },
      { name: 'Cuisine', percentage: Math.floor(Math.random() * 25) + 35 },
      { name: 'Entertainment', percentage: Math.floor(Math.random() * 30) + 45 }
    ]
  }

  const engagementData = {
    registrations: Math.floor(Math.random() * 200) + 50,
    clickThroughRate: (Math.random() * 5 + 1).toFixed(1),
    saveRate: (Math.random() * 8 + 2).toFixed(1),
    shareRate: (Math.random() * 3 + 0.5).toFixed(1),
    averageTimeSpent: `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold mb-2'>Event Insights & Analytics</h1>
        <p className='text-gray-400'>Comprehensive analytics about your events performance and audience</p>
      </div>

      <Tabs defaultValue='overview' className='w-full' onValueChange={setActiveTab}>
        <TabsList className='grid grid-cols-4 mb-8'>
          <TabsTrigger value='overview' className='data-[state=active]:bg-blue-600'>
            <Layers className='h-4 w-4 mr-2' />
            Overview
          </TabsTrigger>
          <TabsTrigger value='audience' className='data-[state=active]:bg-blue-600'>
            <Users className='h-4 w-4 mr-2' />
            Audience
          </TabsTrigger>
          <TabsTrigger value='consumer' className='data-[state=active]:bg-blue-600'>
            <ShoppingCart className='h-4 w-4 mr-2' />
            Consumer Insights
          </TabsTrigger>
          <TabsTrigger value='engagement' className='data-[state=active]:bg-blue-600'>
            <TrendingUp className='h-4 w-4 mr-2' />
            Engagement
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value='overview' className='space-y-8'>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Event Performance at a Glance</h2>

            {/* Page Views Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg overflow-hidden'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-semibold text-white'>Page Views</h3>
                  <div className='flex items-center rounded-full bg-[#121B29] p-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setTimeFilter('24h')}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                        timeFilter === '24h' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'
                      )}
                    >
                      24 hours
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setTimeFilter('7d')}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                        timeFilter === '7d' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'
                      )}
                    >
                      7 days
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setTimeFilter('30d')}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                        timeFilter === '30d' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'
                      )}
                    >
                      30 days
                    </Button>
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className='flex items-center mb-4'>
                    <h3 className='text-4xl font-bold mr-3 text-white'>{pageViewsData[timeFilter]}</h3>
                    <div className='flex items-center px-2 py-1 rounded-md bg-green-500/10 text-green-400'>
                      <ChevronDown className='h-3 w-3 mr-1' />
                      <span className='text-xs font-medium'>{(Math.random() * 5).toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Chart using Shadcn Area Chart */}
                  <div className='mt-2 h-[220px]'>
                    <AreaChartComponent
                      data={chartData}
                      index='date'
                      categories={['Views']}
                      colors={['blue']}
                      className='h-full bg-transparent'
                      valueFormatter={(value) => `${value} views`}
                    />
                  </div>
                </div>
              </Card>

              {/* Quick Stats Card */}
              <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-semibold text-white'>Quick Stats</h3>
                  <div className='flex items-center text-gray-400 text-sm'>
                    <RefreshCw className='h-4 w-4 mr-2' />
                    <span>Updated just now</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-[#1E2530] p-4 rounded-xl'>
                    <div className='flex items-center mb-2'>
                      <Users className='h-5 w-5 text-blue-400 mr-2' />
                      <span className='text-sm text-gray-300'>Total Visitors</span>
                    </div>
                    <p className='text-2xl font-bold text-white'>
                      {pageViewsData['30d']} <span className='text-xs text-gray-400'>users</span>
                    </p>
                  </div>

                  <div className='bg-[#1E2530] p-4 rounded-xl'>
                    <div className='flex items-center mb-2'>
                      <CircleUserRound className='h-5 w-5 text-green-400 mr-2' />
                      <span className='text-sm text-gray-300'>Registrations</span>
                    </div>
                    <p className='text-2xl font-bold text-white'>
                      {engagementData.registrations} <span className='text-xs text-gray-400'>people</span>
                    </p>
                  </div>

                  <div className='bg-[#1E2530] p-4 rounded-xl'>
                    <div className='flex items-center mb-2'>
                      <Clock className='h-5 w-5 text-yellow-400 mr-2' />
                      <span className='text-sm text-gray-300'>Time Spent</span>
                    </div>
                    <p className='text-2xl font-bold text-white'>
                      {engagementData.averageTimeSpent} <span className='text-xs text-gray-400'>avg.</span>
                    </p>
                  </div>

                  <div className='bg-[#1E2530] p-4 rounded-xl'>
                    <div className='flex items-center mb-2'>
                      <Heart className='h-5 w-5 text-red-400 mr-2' />
                      <span className='text-sm text-gray-300'>Interest Level</span>
                    </div>
                    <p className='text-2xl font-bold text-white'>
                      {Math.random() > 0.66 ? 'High' : Math.random() > 0.33 ? 'Medium' : 'Low'}{' '}
                      <span className='text-xs text-gray-400'>rate</span>
                    </p>
                  </div>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center text-blue-400 hover:text-blue-300 pl-0 mt-4'
                >
                  <span>See detailed metrics</span>
                  <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              </Card>
            </div>
          </div>

          <Separator className='bg-[#1E2530]' />

          {/* Top Locations Section */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Top Visitor Locations</h2>

            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-white'>Geographic Distribution</h3>
                <div className='flex items-center text-gray-400 text-sm'>
                  <Clock className='h-4 w-4 mr-2' />
                  <span>Last {timeFilter === '24h' ? '24 hours' : timeFilter === '7d' ? '7 days' : '30 days'}</span>
                </div>
              </div>

              <div className='space-y-6'>
                {topVisitorsData.map((visitor, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-white'>{visitor.location}</span>
                      <span className='text-sm text-blue-400 font-medium'>{visitor.percentage}%</span>
                    </div>
                    <div className='w-full h-2 bg-[#1E2530] rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full'
                        style={{ width: `${visitor.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}

                <Button variant='ghost' size='sm' className='flex items-center text-blue-400 hover:text-blue-300 pl-0'>
                  <span>View all locations</span>
                  <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Audience Tab Content */}
        <TabsContent value='audience' className='space-y-8'>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Audience Demographics</h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Age Distribution Card */}
              <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-xl font-semibold text-white mb-6'>Age Distribution</h3>

                <div className='space-y-4'>
                  {audienceDemographicsData.age.map((ageGroup, index) => (
                    <div key={index} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-white'>{ageGroup.group}</span>
                        <span className='text-sm text-purple-400 font-medium'>{ageGroup.percentage}%</span>
                      </div>
                      <div className='w-full h-2 bg-[#1E2530] rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-purple-600 to-purple-400'
                          style={{ width: `${ageGroup.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Gender Distribution Card */}
              <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-xl font-semibold text-white mb-6'>Gender Distribution</h3>

                <div className='space-y-4'>
                  {audienceDemographicsData.gender.map((gender, index) => (
                    <div key={index} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-white'>{gender.type}</span>
                        <span className='text-sm text-pink-400 font-medium'>{gender.percentage}%</span>
                      </div>
                      <div className='h-2 bg-[#1E2530] rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-pink-600 to-pink-400'
                          style={{ width: `${gender.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className='text-xl font-semibold mb-4'>Audience Interests</h2>

            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <h3 className='text-xl font-semibold text-white mb-6'>Top Interests</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {audienceDemographicsData.interests.map((interest, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-white'>{interest.name}</span>
                      <span className='text-sm text-teal-400 font-medium'>{interest.percentage}%</span>
                    </div>
                    <Progress
                      value={interest.percentage}
                      className='h-2 bg-[#1E2530] [&>div]:bg-gradient-to-r [&>div]:from-teal-600 [&>div]:to-teal-400'
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Consumer Insights Tab Content */}
        <TabsContent value='consumer' className='space-y-8'>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Consumer Preferences & Shopping Insights</h2>

            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-white'>Shopping Categories</h3>
                <div className='flex items-center text-gray-400 text-sm'>
                  <ShoppingCart className='h-4 w-4 mr-2' />
                  <span>Based on browsing data</span>
                </div>
              </div>

              <ScrollArea className='h-[300px] pr-4'>
                <div className='space-y-6'>
                  {consumerPreferencesData.map((preference, index) => (
                    <div key={index} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-white'>{preference.category}</span>
                        <span className='text-sm text-orange-400 font-medium'>{preference.percentage}%</span>
                      </div>
                      <div className='w-full h-3 bg-[#1E2530] rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full'
                          style={{ width: `${preference.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Price Sensitivity Card */}
            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <h3 className='text-xl font-semibold text-white mb-6'>Price Sensitivity</h3>

              <div className='flex items-center justify-center h-[200px]'>
                <div className='w-full bg-[#1E2530] h-8 rounded-full relative'>
                  <div className='absolute -top-2 left-[25%] h-12 w-1 bg-green-400'></div>
                  <div className='absolute -top-6 left-[25%] -translate-x-1/2 bg-green-500 rounded px-2 py-1 text-xs text-white'>
                    Low
                  </div>

                  <div className='absolute -top-2 left-[50%] h-12 w-1 bg-yellow-400'></div>
                  <div className='absolute -top-6 left-[50%] -translate-x-1/2 bg-yellow-500 rounded px-2 py-1 text-xs text-white'>
                    Medium
                  </div>

                  <div className='absolute -top-2 left-[75%] h-12 w-1 bg-red-400'></div>
                  <div className='absolute -top-6 left-[75%] -translate-x-1/2 bg-red-500 rounded px-2 py-1 text-xs text-white'>
                    High
                  </div>

                  {/* Random position indicator */}
                  <div className='absolute -top-2 left-[${Math.floor(Math.random() * 60) + 20}%] h-12 w-4 bg-blue-500 rounded-full flex items-center justify-center'>
                    <div className='h-8 w-8 rounded-full border-4 border-blue-300 bg-blue-600'></div>
                  </div>
                </div>
              </div>

              <p className='text-center text-gray-400 mt-12'>
                Your audience has{' '}
                <span className='text-blue-400 font-medium'>
                  {Math.random() > 0.66 ? 'high' : Math.random() > 0.33 ? 'medium' : 'low'}
                </span>{' '}
                price sensitivity
              </p>
            </Card>

            {/* Brand Affinity Card */}
            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <h3 className='text-xl font-semibold text-white mb-6'>Brand Affinity</h3>

              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-[#1E2530] p-4 rounded-xl'>
                  <span className='text-sm text-gray-300 block mb-1'>Top Brand Category</span>
                  <p className='text-lg font-bold text-white'>
                    {['Luxury', 'Casual', 'Tech', 'Eco-Friendly'][Math.floor(Math.random() * 4)]}
                  </p>
                </div>

                <div className='bg-[#1E2530] p-4 rounded-xl'>
                  <span className='text-sm text-gray-300 block mb-1'>Brand Loyalty</span>
                  <p className='text-lg font-bold text-white'>
                    {Math.random() > 0.66 ? 'High' : Math.random() > 0.33 ? 'Medium' : 'Low'}
                  </p>
                </div>

                <div className='bg-[#1E2530] p-4 rounded-xl'>
                  <span className='text-sm text-gray-300 block mb-1'>Trendsetting</span>
                  <p className='text-lg font-bold text-white'>
                    {Math.random() > 0.5 ? 'Early Adopters' : 'Mainstream'}
                  </p>
                </div>

                <div className='bg-[#1E2530] p-4 rounded-xl'>
                  <span className='text-sm text-gray-300 block mb-1'>Quality Preference</span>
                  <p className='text-lg font-bold text-white'>{Math.random() > 0.5 ? 'Premium' : 'Standard'}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-semibold text-white'>Recommended Sponsors</h3>
              <Button variant='outline' size='sm' className='text-blue-400 border-blue-500 hover:bg-blue-500/10'>
                <Target className='h-4 w-4 mr-2' />
                Connect Sponsors
              </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-[#1E2530] p-4 rounded-xl'>
                <Store className='h-8 w-8 text-blue-400 mb-2' />
                <h4 className='font-bold text-white mb-1'>Fashion Brands</h4>
                <p className='text-sm text-gray-400'>Based on high interest in Fashion & Accessories</p>
              </div>

              <div className='bg-[#1E2530] p-4 rounded-xl'>
                <Store className='h-8 w-8 text-green-400 mb-2' />
                <h4 className='font-bold text-white mb-1'>Food & Beverage</h4>
                <p className='text-sm text-gray-400'>High affinity with your audience demographics</p>
              </div>

              <div className='bg-[#1E2530] p-4 rounded-xl'>
                <Store className='h-8 w-8 text-purple-400 mb-2' />
                <h4 className='font-bold text-white mb-1'>Tech Companies</h4>
                <p className='text-sm text-gray-400'>Match with audience interest in Electronics</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Engagement Tab Content */}
        <TabsContent value='engagement' className='space-y-8'>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Engagement Metrics</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <Card className='p-4 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-sm text-gray-400 mb-1'>Click-Through Rate</h3>
                <p className='text-2xl font-bold text-white'>{engagementData.clickThroughRate}%</p>
                <div className='flex items-center mt-2 text-green-400 text-xs'>
                  <ChevronDown className='h-3 w-3 rotate-180' />
                  <span>+{(Math.random() * 1).toFixed(1)}% vs prev.</span>
                </div>
              </Card>

              <Card className='p-4 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-sm text-gray-400 mb-1'>Save Rate</h3>
                <p className='text-2xl font-bold text-white'>{engagementData.saveRate}%</p>
                <div className='flex items-center mt-2 text-green-400 text-xs'>
                  <ChevronDown className='h-3 w-3 rotate-180' />
                  <span>+{(Math.random() * 2).toFixed(1)}% vs prev.</span>
                </div>
              </Card>

              <Card className='p-4 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-sm text-gray-400 mb-1'>Share Rate</h3>
                <p className='text-2xl font-bold text-white'>{engagementData.shareRate}%</p>
                <div className='flex items-center mt-2 text-red-400 text-xs'>
                  <ChevronDown className='h-3 w-3' />
                  <span>-{(Math.random() * 0.5).toFixed(1)}% vs prev.</span>
                </div>
              </Card>

              <Card className='p-4 bg-[#0E1218] border-[#1E2530] shadow-lg'>
                <h3 className='text-sm text-gray-400 mb-1'>Avg. Time on Page</h3>
                <p className='text-2xl font-bold text-white'>{engagementData.averageTimeSpent}</p>
                <div className='flex items-center mt-2 text-green-400 text-xs'>
                  <ChevronDown className='h-3 w-3 rotate-180' />
                  <span>+{(Math.random() * 0.3).toFixed(2)} min</span>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className='text-xl font-semibold mb-4'>Engagement Flow</h2>

            <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-white'>User Journey</h3>
                <div className='flex items-center text-gray-400 text-sm'>
                  <Clock className='h-4 w-4 mr-2' />
                  <span>Last {timeFilter === '24h' ? '24 hours' : timeFilter === '7d' ? '7 days' : '30 days'}</span>
                </div>
              </div>

              <div className='flex justify-between items-center relative mt-12 mb-6'>
                <div className='absolute top-1/2 left-0 right-0 h-1 bg-[#1E2530] -translate-y-1/2 z-0'></div>

                <div className='flex flex-col items-center relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-[#121B29] border-4 border-blue-500 flex items-center justify-center'>
                    <span className='text-lg font-bold text-white'>1</span>
                  </div>
                  <span className='mt-2 text-sm text-white'>View</span>
                  <span className='text-xs text-gray-400'>100%</span>
                </div>

                <div className='flex flex-col items-center relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-[#121B29] border-4 border-blue-500 flex items-center justify-center'>
                    <span className='text-lg font-bold text-white'>2</span>
                  </div>
                  <span className='mt-2 text-sm text-white'>Details</span>
                  <span className='text-xs text-gray-400'>{Math.floor(Math.random() * 30) + 60}%</span>
                </div>

                <div className='flex flex-col items-center relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-[#121B29] border-4 border-blue-500 flex items-center justify-center'>
                    <span className='text-lg font-bold text-white'>3</span>
                  </div>
                  <span className='mt-2 text-sm text-white'>Register</span>
                  <span className='text-xs text-gray-400'>{Math.floor(Math.random() * 20) + 40}%</span>
                </div>

                <div className='flex flex-col items-center relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-[#121B29] border-2 border-gray-500 flex items-center justify-center'>
                    <span className='text-lg font-bold text-gray-400'>4</span>
                  </div>
                  <span className='mt-2 text-sm text-gray-400'>Payment</span>
                  <span className='text-xs text-gray-400'>{Math.floor(Math.random() * 15) + 25}%</span>
                </div>

                <div className='flex flex-col items-center relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-[#121B29] border-2 border-gray-500 flex items-center justify-center'>
                    <span className='text-lg font-bold text-gray-400'>5</span>
                  </div>
                  <span className='mt-2 text-sm text-gray-400'>Complete</span>
                  <span className='text-xs text-gray-400'>{Math.floor(Math.random() * 10) + 20}%</span>
                </div>
              </div>

              <p className='text-center text-gray-400 mt-8'>
                <span className='text-blue-400 font-medium'>{Math.floor(Math.random() * 20) + 40}%</span> of visitors
                register for your event, with{' '}
                <span className='text-blue-400 font-medium'>{Math.floor(Math.random() * 10) + 20}%</span> completing the
                full process.
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className='bg-[#1E2530] mt-6' />

      {/* Event Feedback Section */}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-2'>Event Feedback</h2>
        <p className='text-gray-400 mb-4'>See how much your guests enjoyed the event.</p>

        <Card className='p-6 bg-[#0E1218] border-[#1E2530] shadow-lg'>
          <div className='flex flex-col items-center justify-center h-40'>
            <p className='text-lg text-center text-gray-400'>
              {timeFilter === '24h'
                ? 'No feedback collected yet for the last 24 hours'
                : timeFilter === '7d'
                  ? 'No feedback collected yet for the last 7 days'
                  : 'No feedback collected yet for the last 30 days'}
            </p>
            <Button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white border-none'>Send Feedback Request</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ViewEventInsights
