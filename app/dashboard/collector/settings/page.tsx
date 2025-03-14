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
import { Save, Truck } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CollectorSettingsPage() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Mike Brown",
    email: "mike.brown@ecocollect.com",
    phone: "+1 (555) 345-6789",
    address: "42 Collector Ave",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    notifyEmail: true,
    notifySMS: true,
    notifyApp: true,
    language: "english",
    theme: "light",
    vehicleId: "WM-1234",
    vehicleType: "Garbage Truck",
    licenseNumber: "CDL-789456",
    preferredArea: "West District",
    startTime: "08:00",
    endTime: "16:00",
    breakTime: "12:00",
    breakDuration: "30",
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
    <DashboardLayout userRole="collector">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                  <h3 className="text-lg font-medium">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" name="address" value={userData.address} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={userData.city} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={userData.state} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" name="zip" value={userData.zip} onChange={handleInputChange} />
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

          <TabsContent value="vehicle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Manage your collection vehicle details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Vehicle ID</Label>
                    <Input id="vehicleId" name="vehicleId" value={userData.vehicleId} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={userData.vehicleType}
                      onValueChange={(value) => handleToggleChange("vehicleType", value)}
                    >
                      <SelectTrigger id="vehicleType">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Garbage Truck">Garbage Truck</SelectItem>
                        <SelectItem value="Recycling Truck">Recycling Truck</SelectItem>
                        <SelectItem value="Pickup Truck">Pickup Truck</SelectItem>
                        <SelectItem value="Utility Van">Utility Van</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={userData.licenseNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredArea">Preferred Area</Label>
                    <Select
                      value={userData.preferredArea}
                      onValueChange={(value) => handleToggleChange("preferredArea", value)}
                    >
                      <SelectTrigger id="preferredArea">
                        <SelectValue placeholder="Select preferred area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North District">North District</SelectItem>
                        <SelectItem value="East District">East District</SelectItem>
                        <SelectItem value="West District">West District</SelectItem>
                        <SelectItem value="South District">South District</SelectItem>
                        <SelectItem value="Central District">Central District</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Vehicle Status</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{userData.vehicleId}</h4>
                          <p className="text-sm text-muted-foreground">{userData.vehicleType}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Maintenance</p>
                        <p className="font-medium">April 15, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Maintenance Due</p>
                        <p className="font-medium">July 15, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel Level</p>
                        <p className="font-medium">75%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="font-medium">24,567 miles</p>
                      </div>
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

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={userData.notifyEmail}
                      onCheckedChange={(checked) => handleToggleChange("notifyEmail", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={userData.notifySMS}
                      onCheckedChange={(checked) => handleToggleChange("notifySMS", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="text-base">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive in-app push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={userData.notifyApp}
                      onCheckedChange={(checked) => handleToggleChange("notifyApp", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Events</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                      <div>Event</div>
                      <div>Email</div>
                      <div>SMS</div>
                      <div>Push</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>Route Updates</div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>Schedule Changes</div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>Vehicle Maintenance</div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={false} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div>Client Messages</div>
                      <div>
                        <Switch checked={false} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                    </div>
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

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
                <CardDescription>Configure your work schedule and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Preferred Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={userData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Preferred End Time</Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={userData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breakTime">Preferred Break Time</Label>
                    <Input
                      id="breakTime"
                      name="breakTime"
                      type="time"
                      value={userData.breakTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                    <Input
                      id="breakDuration"
                      name="breakDuration"
                      type="number"
                      min="15"
                      max="60"
                      step="5"
                      value={userData.breakDuration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Map & Navigation Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="useGoogleMaps" className="text-base">
                          Use Google Maps
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use Google Maps for navigation instead of the built-in map
                        </p>
                      </div>
                      <Switch id="useGoogleMaps" checked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="avoidHighways" className="text-base">
                          Avoid Highways
                        </Label>
                        <p className="text-sm text-muted-foreground">Prefer local roads over highways when possible</p>
                      </div>
                      <Switch id="avoidHighways" checked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="voiceNavigation" className="text-base">
                          Voice Navigation
                        </Label>
                        <p className="text-sm text-muted-foreground">Enable voice directions during navigation</p>
                      </div>
                      <Switch id="voiceNavigation" checked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">App Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="darkMode" className="text-base">
                          Dark Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                      </div>
                      <Switch id="darkMode" checked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoCheckIn" className="text-base">
                          Auto Check-In
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically check in when arriving at collection points
                        </p>
                      </div>
                      <Switch id="autoCheckIn" checked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataUsage" className="text-base">
                          Reduce Data Usage
                        </Label>
                        <p className="text-sm text-muted-foreground">Optimize the app to use less mobile data</p>
                      </div>
                      <Switch id="dataUsage" checked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

