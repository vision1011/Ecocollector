"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Clock, MapPin, Navigation, Phone, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CollectorRoutePage() {
  // Mock data for today's route
  const todayRoute = [
    { id: 1, client: "John Doe", address: "123 Main St", time: "9:00 AM", type: "General Waste", status: "completed" },
    {
      id: 2,
      client: "Emily Smith",
      address: "456 Oak Ave",
      time: "9:30 AM",
      type: "General Waste",
      status: "completed",
    },
    {
      id: 3,
      client: "Michael Johnson",
      address: "789 Pine Rd",
      time: "10:00 AM",
      type: "General Waste",
      status: "in-progress",
    },
    {
      id: 4,
      client: "Sarah Williams",
      address: "321 Elm St",
      time: "10:30 AM",
      type: "General Waste",
      status: "scheduled",
    },
    {
      id: 5,
      client: "David Brown",
      address: "654 Maple Dr",
      time: "11:00 AM",
      type: "General Waste",
      status: "scheduled",
    },
    {
      id: 6,
      client: "Jennifer Davis",
      address: "987 Cedar Ln",
      time: "11:30 AM",
      type: "General Waste",
      status: "scheduled",
    },
    {
      id: 7,
      client: "Robert Wilson",
      address: "135 Birch Ct",
      time: "1:00 PM",
      type: "Recyclables",
      status: "scheduled",
    },
    {
      id: 8,
      client: "Lisa Miller",
      address: "246 Spruce Way",
      time: "1:30 PM",
      type: "Recyclables",
      status: "scheduled",
    },
    {
      id: 9,
      client: "James Taylor",
      address: "357 Willow Pl",
      time: "2:00 PM",
      type: "Recyclables",
      status: "scheduled",
    },
    {
      id: 10,
      client: "Patricia Anderson",
      address: "468 Aspen Rd",
      time: "2:30 PM",
      type: "Recyclables",
      status: "scheduled",
    },
  ]

  // Calculate progress
  const completedCount = todayRoute.filter((item) => item.status === "completed").length
  const inProgressCount = todayRoute.filter((item) => item.status === "in-progress").length
  const progress = Math.round(((completedCount + inProgressCount * 0.5) / todayRoute.length) * 100)

  // Current collection (the one in progress)
  const currentCollection = todayRoute.find((item) => item.status === "in-progress")

  // Selected collection for details
  const [selectedCollection, setSelectedCollection] = useState<number | null>(currentCollection?.id || null)
  const collectionDetails = todayRoute.find((item) => item.id === selectedCollection)

  // Map state
  const [mapLoaded, setMapLoaded] = useState(false)

  // Function to handle status change
  const handleStatusChange = (id: number, newStatus: string) => {
    // In a real app, this would update the status in the database
    console.log(`Changing collection ${id} status to ${newStatus}`)
  }

  // Initialize map (in a real app)
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout userRole="collector">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collection Route</h1>
            <p className="text-muted-foreground">Your assigned waste collection route for today</p>
          </div>
          <Button className="w-full md:w-auto">
            <Navigation className="mr-2 h-4 w-4" /> Start Navigation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <CardTitle>Today's Route</CardTitle>
                  <CardDescription>
                    {completedCount} of {todayRoute.length} collections completed ({progress}%)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4" /> View Map
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div className="col-span-2">Client & Address</div>
                      <div>Time</div>
                      <div>Type</div>
                      <div>Status</div>
                    </div>
                    {todayRoute.map((collection) => (
                      <div
                        key={collection.id}
                        className={`grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedCollection === collection.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedCollection(collection.id)}
                      >
                        <div className="col-span-2">
                          <div className="font-medium">{collection.client}</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {collection.address}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          {collection.time}
                        </div>
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
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div className="col-span-2">Client & Address</div>
                      <div>Time</div>
                      <div>Type</div>
                      <div>Status</div>
                    </div>
                    {todayRoute
                      .filter((c) => c.status === "completed")
                      .map((collection) => (
                        <div
                          key={collection.id}
                          className={`grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedCollection === collection.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedCollection(collection.id)}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{collection.client}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {collection.address}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            {collection.time}
                          </div>
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
                <TabsContent value="pending" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div className="col-span-2">Client & Address</div>
                      <div>Time</div>
                      <div>Type</div>
                      <div>Status</div>
                    </div>
                    {todayRoute
                      .filter((c) => c.status === "scheduled" || c.status === "in-progress")
                      .map((collection) => (
                        <div
                          key={collection.id}
                          className={`grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedCollection === collection.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedCollection(collection.id)}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{collection.client}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {collection.address}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            {collection.time}
                          </div>
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

          <Card>
            {collectionDetails ? (
              <>
                <CardHeader>
                  <CardTitle>Collection Details</CardTitle>
                  <CardDescription>
                    {collectionDetails.status === "completed"
                      ? "Completed collection"
                      : collectionDetails.status === "in-progress"
                        ? "Currently in progress"
                        : "Upcoming collection"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Client Information</h3>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={collectionDetails.client} />
                        <AvatarFallback>{collectionDetails.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{collectionDetails.client}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-4 w-4" />
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Collection Information</h3>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{collectionDetails.address}</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{collectionDetails.time}</span>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                      <span>{collectionDetails.type}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Special Instructions</h3>
                    <p className="text-sm">
                      {collectionDetails.id === 3
                        ? "Bins are located at the side of the house. Please ensure all recyclables are properly sorted."
                        : "No special instructions provided."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Actions</h3>
                    {collectionDetails.status === "scheduled" && (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => handleStatusChange(collectionDetails.id, "in-progress")}
                        >
                          Start Collection
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Navigation className="mr-2 h-4 w-4" /> Navigate
                        </Button>
                      </div>
                    )}

                    {collectionDetails.status === "in-progress" && (
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => handleStatusChange(collectionDetails.id, "completed")}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Completed
                        </Button>
                        <Button variant="outline" className="w-full">
                          Report Issue
                        </Button>
                      </div>
                    )}

                    {collectionDetails.status === "completed" && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>This collection has been completed</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 h-full">
                <Trash2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Collection Details</h3>
                <p className="text-muted-foreground text-center">Select a collection to view details</p>
              </div>
            )}
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
            <CardDescription>Visual overview of your collection route</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] relative">
            {mapLoaded ? (
              <div id="route-map" className="w-full h-full rounded-md overflow-hidden">
                {/* This would be replaced with an actual map component in a real app */}
                <div className="absolute inset-0 bg-gray-100 rounded-md">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=400&width=800')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Map markers for each collection point */}
                    {todayRoute.map((point, index) => (
                      <div
                        key={point.id}
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          point.status === "completed"
                            ? "bg-green-500 text-white border-white"
                            : point.status === "in-progress"
                              ? "bg-blue-500 text-white border-white animate-pulse"
                              : "bg-gray-200 text-gray-700 border-gray-400"
                        }`}
                        style={{
                          top: `${20 + ((index * 30) % 300)}px`,
                          left: `${50 + ((index * 60) % 700)}px`,
                        }}
                        title={`${point.client} - ${point.address}`}
                      >
                        {index + 1}
                      </div>
                    ))}

                    {/* Route line connecting the points */}
                    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                      <path
                        d={todayRoute
                          .map((point, index) => {
                            const x = 53 + ((index * 60) % 700)
                            const y = 23 + ((index * 30) % 300)
                            return `${index === 0 ? "M" : "L"} ${x} ${y}`
                          })
                          .join(" ")}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray={progress < 100 ? "5,5" : "none"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Current location marker */}
                    {currentCollection && (
                      <div
                        className="absolute w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white shadow-lg animate-pulse"
                        style={{
                          top: `${23 + ((todayRoute.findIndex((r) => r.id === currentCollection.id) * 30) % 300) - 4}px`,
                          left: `${53 + ((todayRoute.findIndex((r) => r.id === currentCollection.id) * 60) % 700) - 4}px`,
                        }}
                      >
                        <Navigation className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground h-full">
                <MapPin className="h-16 w-16 animate-pulse" />
                <p>Loading map...</p>
              </div>
            )}

            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="secondary">
                <Navigation className="mr-2 h-4 w-4" /> Navigate
              </Button>
              <Button size="sm" variant="outline">
                <MapPin className="mr-2 h-4 w-4" /> Center Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

