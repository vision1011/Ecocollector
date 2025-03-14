"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Clock, MapPin, Plus, Search, Trash2, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for today's collections
  const todayCollections = [
    {
      id: 1,
      type: "General Waste",
      time: "9:00 AM",
      area: "North District",
      collector: "John Smith",
      status: "in-progress",
    },
    {
      id: 2,
      type: "Recyclables",
      time: "10:30 AM",
      area: "East District",
      collector: "Sarah Johnson",
      status: "completed",
    },
    {
      id: 3,
      type: "Green Waste",
      time: "1:00 PM",
      area: "West District",
      collector: "Mike Brown",
      status: "scheduled",
    },
    {
      id: 4,
      type: "General Waste",
      time: "2:30 PM",
      area: "South District",
      collector: "Lisa Davis",
      status: "scheduled",
    },
  ]

  // Mock data for collectors
  const collectors = [
    { id: 1, name: "John Smith", area: "North District", status: "active", collectionsToday: 5 },
    { id: 2, name: "Sarah Johnson", area: "East District", status: "active", collectionsToday: 4 },
    { id: 3, name: "Mike Brown", area: "West District", status: "active", collectionsToday: 6 },
    { id: 4, name: "Lisa Davis", area: "South District", status: "active", collectionsToday: 5 },
    { id: 5, name: "Robert Wilson", area: "Central District", status: "inactive", collectionsToday: 0 },
  ]

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage waste collection operations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Collection
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Users className="mr-2 h-4 w-4" /> Manage Collectors
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Collections</CardTitle>
                  <CardDescription>Scheduled waste collection for today</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search collections..."
                    className="w-[200px]"
                    startIcon={<Search className="h-4 w-4" />}
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="general">General Waste</SelectItem>
                      <SelectItem value="recyclables">Recyclables</SelectItem>
                      <SelectItem value="green">Green Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trash2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{collection.type}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {collection.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {collection.area}
                        </div>
                        <div className="text-sm mt-1">
                          Collector: <span className="font-medium">{collection.collector}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        collection.status === "completed"
                          ? "outline"
                          : collection.status === "in-progress"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {collection.status === "completed"
                        ? "Completed"
                        : collection.status === "in-progress"
                          ? "In Progress"
                          : "Scheduled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Collection Calendar</CardTitle>
              <CardDescription>View and manage schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-4">
                <h4 className="font-medium mb-2">Collections on {date?.toLocaleDateString()}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm p-2 bg-muted rounded-md">
                    <span>General Waste</span>
                    <span>15 scheduled</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2 bg-muted rounded-md">
                    <span>Recyclables</span>
                    <span>8 scheduled</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2 bg-muted rounded-md">
                    <span>Green Waste</span>
                    <span>6 scheduled</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Waste Collectors</CardTitle>
                <CardDescription>Manage your collection team</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Collector
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Collectors</TabsTrigger>
                <TabsTrigger value="all">All Collectors</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div>Name</div>
                    <div>Assigned Area</div>
                    <div>Status</div>
                    <div>Collections Today</div>
                    <div>Actions</div>
                  </div>
                  {collectors
                    .filter((c) => c.status === "active")
                    .map((collector) => (
                      <div
                        key={collector.id}
                        className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center"
                      >
                        <div className="font-medium">{collector.name}</div>
                        <div>{collector.area}</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Active
                          </Badge>
                        </div>
                        <div>{collector.collectionsToday}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div>Name</div>
                    <div>Assigned Area</div>
                    <div>Status</div>
                    <div>Collections Today</div>
                    <div>Actions</div>
                  </div>
                  {collectors.map((collector) => (
                    <div key={collector.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="font-medium">{collector.name}</div>
                      <div>{collector.area}</div>
                      <div>
                        <Badge
                          variant={collector.status === "active" ? "outline" : "secondary"}
                          className={
                            collector.status === "active" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                          }
                        >
                          {collector.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div>{collector.collectionsToday}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

