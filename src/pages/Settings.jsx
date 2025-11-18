import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  CalendarCheck, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import RevenueChart from '@/components/dashboard/RevenueChart';
import BookingStatusChart from '@/components/dashboard/BookingStatusChart';
import RecentBookings from '@/components/dashboard/RecentBookings';
import PopularEquipment from '@/components/dashboard/PopularEquipment';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    title: 'Active Bookings',
    value: '24',
    change: '+4',
    trend: 'up',
    icon: CalendarCheck,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Total Equipment',
    value: '156',
    change: '8 in maintenance',
    trend: 'neutral',
    icon: Package,
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    title: 'Customers',
    value: '89',
    change: '+18 this month',
    trend: 'up',
    icon: Users,
    color: 'text-info',
    bgColor: 'bg-info/10'
  },
];

const equipmentStatus = [
  { status: 'Available', count: 98, color: 'bg-success', percentage: 63 },
  { status: 'Rented', count: 50, color: 'bg-primary', percentage: 32 },
  { status: 'Maintenance', count: 8, color: 'bg-warning', percentage: 5 },
];

const alerts = [
  { type: 'warning', message: '3 items due for maintenance this week', icon: AlertCircle },
  { type: 'success', message: '12 bookings completed today', icon: CheckCircle },
  { type: 'info', message: '5 pending customer reviews', icon: Clock },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
          <CalendarCheck className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 hover:border-primary/50 transition-all shadow-sm hover:shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="grid gap-3 md:grid-cols-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <Card key={index} className={`border-l-4 ${
              alert.type === 'warning' ? 'border-l-warning bg-warning/5' :
              alert.type === 'success' ? 'border-l-success bg-success/5' :
              'border-l-info bg-info/5'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-warning' :
                    alert.type === 'success' ? 'text-success' :
                    'text-info'
                  }`} />
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm hover:shadow-elegant transition-all">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm hover:shadow-elegant transition-all">
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>Current booking distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingStatusChart />
          </CardContent>
        </Card>
      </div>

      {/* Equipment Status */}
      <Card className="shadow-sm hover:shadow-elegant transition-all">
        <CardHeader>
          <CardTitle>Equipment Status</CardTitle>
          <CardDescription>Current availability of rental equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {equipmentStatus.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-foreground">{item.status}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count} items</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentBookings />
        <PopularEquipment />
      </div>
    </div>
  );
}
