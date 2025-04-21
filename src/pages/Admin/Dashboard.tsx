import React from 'react';
import { OverviewCard } from 'src/components/Admin/OverviewCard';
import { RecentSales } from 'src/components/Admin/RecentSales';
import { 
  ArrowUpRight, 
  Users, 
  Calendar, 
  CreditCard, 
  ArrowRight,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { AreaChartComponent } from 'src/components/ui/area-chart';

const data = [
  {
    name: 'Jan',
    total: 2400,
  },
  {
    name: 'Feb',
    total: 1398,
  },
  {
    name: 'Mar',
    total: 9800,
  },
  {
    name: 'Apr',
    total: 3908,
  },
  {
    name: 'May',
    total: 4800,
  },
  {
    name: 'Jun',
    total: 3800,
  },
  {
    name: 'Jul',
    total: 4300,
  },
  {
    name: 'Aug',
    total: 5300,
  },
  {
    name: 'Sep',
    total: 4500,
  },
  {
    name: 'Oct',
    total: 5700,
  },
  {
    name: 'Nov',
    total: 6100,
  },
  {
    name: 'Dec',
    total: 7200,
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCard 
              title="Total Users"
              value="2,800"
              description="15% increase from last month" 
              icon={Users}
            />
            <OverviewCard 
              title="Active Events"
              value="156"
              description="+22 in the last week"
              icon={Calendar} 
            />
            <OverviewCard 
              title="Total Revenue"
              value="$45,223"
              description="12% increase from last month"
              icon={CreditCard} 
            />
            <OverviewCard 
              title="Active Visitors"
              value="438"
              description="+20% from last hour"
              icon={ArrowUpRight} 
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChartComponent 
                  data={data}
                  index="name"
                  categories={["total"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  Latest event purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Events
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+28</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="me-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">18%</span> from last month
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Events <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Registrations
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+189</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="me-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">32%</span> from last month
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Users <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowDown className="me-1 h-3 w-3 text-rose-500" />
                  <span className="text-rose-500">-0.5%</span> from last month
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Analytics <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics data will be displayed here.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Advanced analytics dashboard coming soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}