"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarClock, Clock, MapPin, Navigation, Truck } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CollectorSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState("week")

  // Handle date changes safely
  const handleDateChange = (newDate: Date | undefined) => {
    try {
      setDate(newDate)
    } catch (error) {
      console.error("Error changing date:", error)
    }
  }

  // Mock data for scheduled collections
  const weeklySchedule = [
    {
      day: "Monday",
      routes: [
        { id: 1, area: "North District", startTime: "8:00 AM", endTime: "12:00 PM", stops: 12, status: "completed" },
        { id: 2, area: "East District", startTime: "1:00 PM", endTime: "5:00 PM", stops: 10, status: "scheduled" },
      ],
    },
    {
      day: "Tuesday",
      routes: [
        { id: 3, area: "West District", startTime: "8:00 AM", endTime: "12:00 PM", stops: 14, status: "scheduled" },
        { id: 4, area: "South District", startTime: "1:00 PM", endTime: "5:00 PM", stops: 11, status: "scheduled" },
      ],
    },
    {
      day: "Wednesday",
      routes: [
        { id: 5, area: "Central District", startTime: "8:00 AM", endTime: "12:00 PM", stops: 15, status: "scheduled" },
        { id: 6, area: "North District", startTime: "1:00 PM", endTime: "5:00 PM", stops: 9, status: "scheduled" },
      ],
    },
    {
      day: "Thursday",
      routes: [
        { id: 7, area: "East District", startTime: "8:00 AM", endTime: "12:00 PM", stops: 13, status: "scheduled" },
        { id: 8, area: "West District", startTime: "1:00 PM", endTime: "5:00 PM", stops: 10, status: "scheduled" },
      ],
    },
    {
      day: "Friday",
      routes: [
        { id: 9, area: "South District", startTime: "8:00 AM", endTime: "12:00 PM", stops: 12, status: "scheduled" },
        { id: 10, area: "Central District", startTime: "1:00 PM", endTime: "5:00 PM", stops: 8, status: "scheduled" },
      ],
    },
  ]

  // Mock data for monthly schedule
  const monthlySchedule = {
    "General Waste": ["Monday", "Thursday"],
    Recyclables: ["Tuesday", "Friday"],
    "Green Waste": ["Wednesday"],
    "Hazardous Waste": ["Last Friday of month"],
  }

  // Get today's day name
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  // Filter today's routes
  const todayRoutes = weeklySchedule.find((schedule) => schedule.day === today)?.routes || []

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would fetch data from an API
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching schedule data:", error)
        setIsLoading(false)
      }
    }

    fetchScheduleData()
  }, [])

  return (
    <DashboardLayout userRole="collector">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collection Schedule</h1>
            <p className="text-muted-foreground">View and manage your collection schedule</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue={view} onValueChange={setView}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <CalendarClock className="mr-2 h-4 w-4" /> Sync Calendar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Collection Schedule</CardTitle>
              <CardDescription>Your upcoming waste collection assignments</CardDescription>
              <Tabs defaultValue={view} onValueChange={setView} className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="day" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{today}'s Routes</h3>
                    <Button variant="outline" size="sm">
                      <Navigation className="mr-2 h-4 w-4" /> Start Navigation
                    </Button>
                  </div>

                  {todayRoutes.length > 0 ? (
                    todayRoutes.map((route) => (
                      <div
                        key={route.id}
                        className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{route.area}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {route.startTime} - {route.endTime}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="mr-1 h-4 w-4" />
                              {route.stops} collection points
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={route.status === "completed" ? "outline" : "default"}
                            className={
                              route.status === "completed" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                            }
                          >
                            {route.status === "completed" ? "Completed" : "Scheduled"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No routes scheduled for today</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                <div className="space-y-6">
                  {weeklySchedule.map((schedule) => (
                    <div key={schedule.day} className="space-y-2">
                      <h3 className="text-lg font-medium flex items-center">
                        {schedule.day}
                        {schedule.day === today && (
                          <Badge variant="outline" className="ml-2">
                            Today
                          </Badge>
                        )}
                      </h3>

                      {schedule.routes.length > 0 ? (
                        <div className="space-y-2">
                          {schedule.routes.map((route) => (
                            <div
                              key={route.id}
                              className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-full">
                                  <Truck className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">{route.area}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {route.startTime} - {route.endTime} • {route.stops} stops
                                  </div>
                                </div>
                              </div>
                              <Badge
                                variant={route.status === "completed" ? "outline" : "default"}
                                className={
                                  route.status === "completed" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                                }
                              >
                                {route.status === "completed" ? "Completed" : "Scheduled"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground border rounded-lg">
                          No routes scheduled
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="month" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Monthly Collection Pattern</h3>

                  <div className="space-y-2">
                    {Object.entries(monthlySchedule).map(([wasteType, days]) => (
                      <div key={wasteType} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              wasteType === "General Waste"
                                ? "bg-gray-100"
                                : wasteType === "Recyclables"
                                  ? "bg-green-100"
                                  : wasteType === "Green Waste"
                                    ? "bg-emerald-100"
                                    : "bg-red-100"
                            }`}
                          >
                            <Truck
                              className={`h-5 w-5 ${
                                wasteType === "General Waste"
                                  ? "text-gray-600"
                                  : wasteType === "Recyclables"
                                    ? "text-green-600"
                                    : wasteType === "Green Waste"
                                      ? "text-emerald-600"
                                      : "text-red-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{wasteType}</h4>
                            <div className="text-sm text-muted-foreground">{days.join(", ")}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Special Collections</h3>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-100 p-2 rounded-full">
                            <Truck className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Bulk Waste Collection</h4>
                            <div className="text-sm text-muted-foreground">Last Saturday of the month</div>
                          </div>
                        </div>
                        <Badge>Special</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Calendar</CardTitle>
              <CardDescription>View your scheduled collections</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={handleDateChange} className="rounded-md border" />
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Legend</h3>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm">General Waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Recyclables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">Green Waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Hazardous Waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Special Collection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

