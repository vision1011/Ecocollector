"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminSettingsPage() {
  // Mock system settings
  const [systemSettings, setSystemSettings] = useState({
    companyName: "EcoCollect Waste Management",
    email: "admin@ecocollect.com",
    phone: "+1 (555) 123-4567",
    address: "123 Green Street, Anytown, CA 12345",
    logo: "/placeholder.svg?height=64&width=64",
    primaryColor: "#22c55e",
    language: "english",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    autoAssign: true,
    requireConfirmation: true,
    allowRescheduling: true,
    maxReschedulesPerMonth: "3",
    collectionStartTime: "08:00",
    collectionEndTime: "18:00",
    apiKey: "sk_test_12345678901234567890",
    webhookUrl: "https://ecocollect.com/api/webhooks",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSystemSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (name, value) => {
    setSystemSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to the server
    console.log("Saving settings:", systemSettings)
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure your waste management system</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic information about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={systemSettings.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={systemSettings.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" name="phone" value={systemSettings.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Company Address</Label>
                    <Input id="address" name="address" value={systemSettings.address} onChange={handleInputChange} />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">System Language</Label>
                    <Select
                      value={systemSettings.language}
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
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={systemSettings.timezone}
                      onValueChange={(value) => handleToggleChange("timezone", value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={systemSettings.dateFormat}
                      onValueChange={(value) => handleToggleChange("dateFormat", value)}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select
                      value={systemSettings.timeFormat}
                      onValueChange={(value) => handleToggleChange("timeFormat", value)}
                    >
                      <SelectTrigger id="timeFormat">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Customize your application's appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={systemSettings.logo || "/placeholder.svg"}
                        alt="Company Logo"
                        className="h-16 w-16 rounded-md border"
                      />
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 512x512px. Max file size: 2MB.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-4">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="color"
                        value={systemSettings.primaryColor}
                        onChange={handleInputChange}
                        className="w-16 h-10 p-1"
                      />
                      <Input value={systemSettings.primaryColor} onChange={handleInputChange} name="primaryColor" />
                    </div>
                    <p className="text-xs text-muted-foreground">This color will be used throughout the application.</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emailTemplate">Email Template</Label>
                  <Textarea
                    id="emailTemplate"
                    className="min-h-[200px] font-mono text-sm"
                    placeholder="HTML email template code goes here..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Use variables like {"{client_name}"}, {"{collection_date}"}, etc.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={systemSettings.emailNotifications}
                      onCheckedChange={(checked) => handleToggleChange("emailNotifications", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Send notifications via text message</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={systemSettings.smsNotifications}
                      onCheckedChange={(checked) => handleToggleChange("smsNotifications", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="text-base">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Send in-app push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={systemSettings.pushNotifications}
                      onCheckedChange={(checked) => handleToggleChange("pushNotifications", checked)}
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
                      <div>Collection Reminder</div>
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
                      <div>Collection Completed</div>
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
                    <div className="grid grid-cols-4 gap-4 p-4 border-b">
                      <div>Collection Missed</div>
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
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div>Schedule Changed</div>
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
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Operational Settings</CardTitle>
                <CardDescription>Configure how collections are managed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoAssign" className="text-base">
                        Auto-Assign Collectors
                      </Label>
                      <p className="text-sm text-muted-foreground">Automatically assign collectors to routes</p>
                    </div>
                    <Switch
                      id="autoAssign"
                      checked={systemSettings.autoAssign}
                      onCheckedChange={(checked) => handleToggleChange("autoAssign", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireConfirmation" className="text-base">
                        Require Confirmation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require client confirmation for scheduled collections
                      </p>
                    </div>
                    <Switch
                      id="requireConfirmation"
                      checked={systemSettings.requireConfirmation}
                      onCheckedChange={(checked) => handleToggleChange("requireConfirmation", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowRescheduling" className="text-base">
                        Allow Rescheduling
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow clients to reschedule collections</p>
                    </div>
                    <Switch
                      id="allowRescheduling"
                      checked={systemSettings.allowRescheduling}
                      onCheckedChange={(checked) => handleToggleChange("allowRescheduling", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxReschedulesPerMonth">Max Reschedules Per Month</Label>
                    <Input
                      id="maxReschedulesPerMonth"
                      name="maxReschedulesPerMonth"
                      type="number"
                      min="0"
                      max="10"
                      value={systemSettings.maxReschedulesPerMonth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="collectionStartTime">Collection Start Time</Label>
                    <Input
                      id="collectionStartTime"
                      name="collectionStartTime"
                      type="time"
                      value={systemSettings.collectionStartTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collectionEndTime">Collection End Time</Label>
                    <Input
                      id="collectionEndTime"
                      name="collectionEndTime"
                      type="time"
                      value={systemSettings.collectionEndTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>Configure external integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id="apiKey"
                          name="apiKey"
                          type="password"
                          value={systemSettings.apiKey}
                          onChange={handleInputChange}
                          className="font-mono"
                        />
                        <Button variant="outline">Show</Button>
                        <Button variant="outline">Regenerate</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Use this key to authenticate API requests.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      name="webhookUrl"
                      value={systemSettings.webhookUrl}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">We'll send event notifications to this URL.</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Third-Party Integrations</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                      <div>Service</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 border-b">
                      <div>Payment Gateway</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 border-b">
                      <div>Google Maps</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 border-b">
                      <div>SMS Provider</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4">
                      <div>CRM System</div>
                      <div>
                        <Badge variant="secondary">Not Connected</Badge>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

