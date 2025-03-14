"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Clock, MapPin, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for upcoming collections
  const upcomingCollections = [
    { id: 1, type: "General Waste", date: "Tomorrow, 9:00 AM", status: "scheduled" },
    { id: 2, type: "Recyclables", date: "May 20, 9:00 AM", status: "scheduled" },
    { id: 3, type: "Green Waste", date: "May 25, 10:00 AM", status: "scheduled" },
  ]

  // Mock data for collection history
  const collectionHistory = [
    { id: 101, type: "General Waste", date: "May 10, 9:05 AM", status: "completed" },
    { id: 102, type: "Recyclables", date: "May 5, 9:12 AM", status: "completed" },
    { id: 103, type: "General Waste", date: "April 26, 9:00 AM", status: "completed" },
    { id: 104, type: "Green Waste", date: "April 20, 10:15 AM", status: "completed" },
  ]

  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
            <p className="text-muted-foreground">Manage your waste collection schedule</p>
          </div>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Request Special Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Collections</CardTitle>
              <CardDescription>Your scheduled waste collection services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCollections.map((collection) => (
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
                          {collection.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          123 Main Street
                        </div>
                      </div>
                    </div>
                    <Badge variant={collection.status === "completed" ? "outline" : "default"}>
                      {collection.status === "scheduled" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Collection Calendar</CardTitle>
              <CardDescription>View your scheduled collections</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-sm">General Waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Recyclables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Green Waste</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collection History</CardTitle>
            <CardDescription>View your past waste collection services</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="general">General Waste</TabsTrigger>
                <TabsTrigger value="recyclables">Recyclables</TabsTrigger>
                <TabsTrigger value="green">Green Waste</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {collectionHistory.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <Trash2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{collection.type}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {collection.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          123 Main Street
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Completed</Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="general">
                {collectionHistory
                  .filter((c) => c.type === "General Waste")
                  .map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                          <Trash2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{collection.type}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {collection.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="mr-1 h-4 w-4" />
                            123 Main Street
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="recyclables">
                {collectionHistory
                  .filter((c) => c.type === "Recyclables")
                  .map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                          <Trash2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{collection.type}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {collection.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="mr-1 h-4 w-4" />
                            123 Main Street
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="green">
                {collectionHistory
                  .filter((c) => c.type === "Green Waste")
                  .map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                          <Trash2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{collection.type}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {collection.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="mr-1 h-4 w-4" />
                            123 Main Street
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

