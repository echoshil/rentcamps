import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Building, 
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    newBookings: true,
    paymentConfirmations: true,
    equipmentReturns: true,
    maintenanceAlerts: true,
    customerReviews: false,
    marketingEmails: false,
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" defaultValue="Admin" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="admin@campgear.com" defaultValue="admin@campgear.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself..." 
                  defaultValue="Outdoor equipment rental specialist with 10+ years of experience."
                  rows={4}
                />
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSave('Profile')} className="bg-gradient-primary">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <CardTitle>Business Information</CardTitle>
              </div>
              <CardDescription>Configure your business details and rental policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="CampGear Rentals" defaultValue="CampGear Rentals" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" placeholder="123 Mountain Road" defaultValue="456 Forest Avenue, Suite 100" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Portland" defaultValue="Portland" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="OR">
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="97201" defaultValue="97201" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input id="businessPhone" type="tel" defaultValue="+1 (555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" defaultValue="info@campgear.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://campgear.com" defaultValue="https://campgear.com" />
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSave('Business')} className="bg-gradient-primary">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <CardTitle>Rental Policies</CardTitle>
              <CardDescription>Set your rental terms and conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minRental">Minimum Rental Period (days)</Label>
                  <Input id="minRental" type="number" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depositPercent">Deposit Percentage (%)</Label>
                  <Input id="depositPercent" type="number" defaultValue="20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                <Textarea 
                  id="cancellationPolicy" 
                  placeholder="Enter your cancellation policy..."
                  defaultValue="Free cancellation up to 48 hours before rental start date. 50% refund for cancellations within 48 hours."
                  rows={3}
                />
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSave('Rental Policies')} className="bg-gradient-primary">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newBookings" className="text-base">New Bookings</Label>
                    <p className="text-sm text-muted-foreground">Get notified when a new booking is received</p>
                  </div>
                  <Switch
                    id="newBookings"
                    checked={notifications.newBookings}
                    onCheckedChange={(checked) => setNotifications({...notifications, newBookings: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payments" className="text-base">Payment Confirmations</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when payments are processed</p>
                  </div>
                  <Switch
                    id="payments"
                    checked={notifications.paymentConfirmations}
                    onCheckedChange={(checked) => setNotifications({...notifications, paymentConfirmations: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="returns" className="text-base">Equipment Returns</Label>
                    <p className="text-sm text-muted-foreground">Alerts when equipment is returned</p>
                  </div>
                  <Switch
                    id="returns"
                    checked={notifications.equipmentReturns}
                    onCheckedChange={(checked) => setNotifications({...notifications, equipmentReturns: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance" className="text-base">Maintenance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Reminders for equipment maintenance</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, maintenanceAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reviews" className="text-base">Customer Reviews</Label>
                    <p className="text-sm text-muted-foreground">Notifications for new customer reviews</p>
                  </div>
                  <Switch
                    id="reviews"
                    checked={notifications.customerReviews}
                    onCheckedChange={(checked) => setNotifications({...notifications, customerReviews: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing" className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Updates about new features and tips</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSave('Notification')} className="bg-gradient-primary">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Active Sessions</Label>
                    <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSave('Security')} className="bg-gradient-primary">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="shadow-sm hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Billing Information</CardTitle>
              </div>
              <CardDescription>Manage your billing details and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">Current Plan</p>
                    <p className="text-sm text-muted-foreground">Professional Plan</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">Active</Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">$99.00 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                <Button variant="outline" size="sm">Change Plan</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 rounded bg-gradient-primary flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>

              <Separator />

              <div className="space-y-2">
                <Label>Billing History</Label>
                <div className="space-y-2">
                  {[
                    { date: 'Jan 1, 2024', amount: '$99.00', status: 'Paid' },
                    { date: 'Dec 1, 2023', amount: '$99.00', status: 'Paid' },
                    { date: 'Nov 1, 2023', amount: '$99.00', status: 'Paid' },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{invoice.date}</p>
                        <p className="text-xs text-muted-foreground">{invoice.status}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{invoice.amount}</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
