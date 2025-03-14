"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, MapPin, Navigation, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CollectorDashboard() {
  // Mock data for today's route
  const todayRoute = [
    { id: 1, address: "123 Main St", time: "9:00 AM", type: "General Waste", status: "completed" },
    { id: 2, address: "456 Oak Ave", time: "9:30 AM", type: "General Waste", status: "completed" },
    { id: 3, address: "789 Pine Rd", time: "10:00 AM", type: "General Waste", status: "in-progress" },
    { id: 4, address: "321 Elm St", time: "10:30 AM", type: "General Waste", status: "scheduled" },
    { id: 5, address: "654 Maple Dr", time: "11:00 AM", type: "General Waste", status: "scheduled" },
    { id: 6, address: "987 Cedar Ln", time: "11:30 AM", type: "General Waste", status: "scheduled" },
    { id: 7, address: "135 Birch Ct", time: "1:00 PM", type: "Recyclables", status: "scheduled" },
    { id: 8, address: "246 Spruce Way", time: "1:30 PM", type: "Recyclables", status: "scheduled" },
    { id: 9, address: "357 Willow Pl", time: "2:00 PM", type: "Recyclables", status: "scheduled" },
    { id: 10, address: "468 Aspen Rd", time: "2:30 PM", type: "Recyclables", status: "scheduled" },
  ]

  // Calculate progress
  const completedCount = todayRoute.filter((item) => item.status === "completed").length
  const inProgressCount = todayRoute.filter((item) => item.status === "in-progress").length
  const progress = Math.round(((completedCount + inProgressCount * 0.5) / todayRoute.length) * 100)

  // Current collection (the one in progress)
  const currentCollection = todayRoute.find((item) => item.status === "in-progress")

  // Next collection
  const nextCollection = todayRoute.find((item) => item.status === "scheduled")

  return (
    <DashboardLayout userRole="collector">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collector Dashboard</h1>
            <p className="text-muted-foreground">Manage your collection routes</p>
          </div>
          <Button className="w-full md:w-auto">
            <Navigation className="mr-2 h-4 w-4" /> Start Navigation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
              <CardDescription>
                {completedCount} of {todayRoute.length} collections completed
              </CardDescription>
              <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              {currentCollection && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Current Collection</h3>
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trash2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{currentCollection.address}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {currentCollection.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {currentCollection.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="w-full">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Completed
                      </Button>
                      <Button variant="outline" className="w-full">
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {nextCollection && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Next Collection</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-background p-2 rounded-full">
                        <Trash2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{nextCollection.address}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {nextCollection.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {nextCollection.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="w-full">
                        Start Collection
                      </Button>
                      <Button variant="outline" className="w-full">
                        View on Map
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Stats</CardTitle>
              <CardDescription>Your collection performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Today's Collections</span>
                  <span className="font-bold">{todayRoute.length}</span>
                </div>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="font-bold">{completedCount}</span>
                </div>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">In Progress</span>
                  <span className="font-bold">{inProgressCount}</span>
                </div>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Remaining</span>
                  <span className="font-bold">{todayRoute.length - completedCount - inProgressCount}</span>
                </div>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="font-bold">{progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collection Route</CardTitle>
            <CardDescription>Your scheduled collections for today</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Address</div>
                    <div>Time</div>
                    <div>Type</div>
                    <div>Status</div>
                  </div>
                  {todayRoute.map((collection) => (
                    <div key={collection.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="font-medium">{collection.address}</div>
                      <div>{collection.time}</div>
                      <div>{collection.type}</div>
                      <div>
                        <Badge
                          variant={
                            collection.status === "completed"
                              ? "outline"
                              : collection.status === "in-progress"
                                ? "secondary"
                                : "default"
                          }
                          className={
                            collection.status === "completed" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                          }
                        >
                          {collection.status === "completed"
                            ? "Completed"
                            : collection.status === "in-progress"
                              ? "In Progress"
                              : "Scheduled"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Address</div>
                    <div>Time</div>
                    <div>Type</div>
                    <div>Status</div>
                  </div>
                  {todayRoute
                    .filter((c) => c.status === "completed")
                    .map((collection) => (
                      <div
                        key={collection.id}
                        className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center"
                      >
                        <div className="font-medium">{collection.address}</div>
                        <div>{collection.time}</div>
                        <div>{collection.type}</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="scheduled" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Address</div>
                    <div>Time</div>
                    <div>Type</div>
                    <div>Status</div>
                  </div>
                  {todayRoute
                    .filter((c) => c.status === "scheduled" || c.status === "in-progress")
                    .map((collection) => (
                      <div
                        key={collection.id}
                        className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center"
                      >
                        <div className="font-medium">{collection.address}</div>
                        <div>{collection.time}</div>
                        <div>{collection.type}</div>
                        <div>
                          <Badge variant={collection.status === "in-progress" ? "secondary" : "default"}>
                            {collection.status === "in-progress" ? "In Progress" : "Scheduled"}
                          </Badge>
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

