import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const customersData = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8901',
    location: 'San Francisco, CA',
    totalBookings: 12,
    totalSpent: 2450,
    lastBooking: '2024-01-20',
    joinedDate: '2023-06-15',
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+1 234-567-8902',
    location: 'Los Angeles, CA',
    totalBookings: 8,
    totalSpent: 1680,
    lastBooking: '2024-01-18',
    joinedDate: '2023-08-22',
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234-567-8903',
    location: 'Seattle, WA',
    totalBookings: 15,
    totalSpent: 3200,
    lastBooking: '2024-01-15',
    joinedDate: '2023-04-10',
    status: 'vip'
  },
  {
    id: 'CUST-004',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 234-567-8904',
    location: 'Portland, OR',
    totalBookings: 5,
    totalSpent: 890,
    lastBooking: '2024-01-12',
    joinedDate: '2023-10-05',
    status: 'active'
  },
  {
    id: 'CUST-005',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+1 234-567-8905',
    location: 'Denver, CO',
    totalBookings: 3,
    totalSpent: 520,
    lastBooking: '2023-12-20',
    joinedDate: '2023-11-12',
    status: 'active'
  },
  {
    id: 'CUST-006',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+1 234-567-8906',
    location: 'Austin, TX',
    totalBookings: 1,
    totalSpent: 180,
    lastBooking: '2023-09-15',
    joinedDate: '2023-09-10',
    status: 'inactive'
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'vip':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89</div>
            <p className="text-xs text-success mt-1">+18 this month</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>VIP Customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">12</div>
            <p className="text-xs text-muted-foreground mt-1">Top spenders</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Active This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">45</div>
            <p className="text-xs text-muted-foreground mt-1">50.6% engagement</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Avg. Lifetime Value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$1,845</div>
            <p className="text-xs text-success mt-1">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-gradient-primary">
                    <AvatarFallback className="bg-transparent text-primary-foreground text-lg font-semibold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription className="text-xs">{customer.id}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(customer.status)} variant="outline">
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Total Bookings</p>
                    <p className="font-semibold text-foreground">{customer.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Total Spent</p>
                    <p className="font-semibold text-primary">${customer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Last Booking</p>
                    <p className="font-medium text-foreground text-xs">{customer.lastBooking}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Member Since</p>
                    <p className="font-medium text-foreground text-xs">{customer.joinedDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-foreground">No customers found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
