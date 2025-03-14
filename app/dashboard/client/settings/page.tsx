"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BellRing, CreditCard, Home, MapPin, Save } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientSettingsPage() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    notifyEmail: true,
    notifySMS: false,
    notifyApp: true,
    language: "english",
    theme: "light",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save the data to the server
    console.log("Saving profile:", userData)
  }

  const handleSaveNotifications = () => {
    // In a real app, this would save the notification settings to the server
    console.log("Saving notification settings:", userData)
  }

  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                      <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="grid gap-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={userData.language}
                          onValueChange={(value) => handleToggleChange("language", value)}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>Manage your collection addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Primary Address</h3>
                        <p className="text-sm text-muted-foreground">{userData.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.city}, {userData.state} {userData.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Secondary Address</h3>
                        <p className="text-sm text-muted-foreground">456 Oak Avenue</p>
                        <p className="text-sm text-muted-foreground">Anytown, CA 12345</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" /> Add New Address
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellRing className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive collection reminders via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={userData.notifyEmail}
                      onCheckedChange={(checked) => handleToggleChange("notifyEmail", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellRing className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive collection reminders via text message</p>
                      </div>
                    </div>
                    <Switch
                      checked={userData.notifySMS}
                      onCheckedChange={(checked) => handleToggleChange("notifySMS", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellRing className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">App Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive push notifications in the app</p>
                      </div>
                    </div>
                    <Switch
                      checked={userData.notifyApp}
                      onCheckedChange={(checked) => handleToggleChange("notifyApp", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your payment methods and billing history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Visa ending in 4242</h3>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        <p className="text-sm text-muted-foreground">Default payment method</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Mastercard ending in 5678</h3>
                        <p className="text-sm text-muted-foreground">Expires 08/2024</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                      <div>Date</div>
                      <div>Description</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>May 1, 2025</div>
                      <div>Monthly Service - May</div>
                      <div>$45.00</div>
                      <div className="text-green-600">Paid</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>Apr 1, 2025</div>
                      <div>Monthly Service - April</div>
                      <div>$45.00</div>
                      <div className="text-green-600">Paid</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div>Mar 1, 2025</div>
                      <div>Monthly Service - March</div>
                      <div>$45.00</div>
                      <div className="text-green-600">Paid</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

