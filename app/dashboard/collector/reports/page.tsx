"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { BarChart3, CalendarIcon, Download, FileText, PieChart, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CollectorReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [reportType, setReportType] = useState("collections")
  const [timeFrame, setTimeFrame] = useState("month")

  // Mock data for performance metrics
  const performanceMetrics = {
    collectionsCompleted: 248,
    collectionsPerDay: 12.4,
    onTimeRate: 96.8,
    averageCompletionTime: "18 minutes",
    clientSatisfaction: 4.7,
    fuelEfficiency: "8.2 miles/gallon",
    wasteCollected: "42.6 tons",
    recyclingRate: 38.5,
  }

  // Mock data for collection types
  const collectionTypes = [
    { type: "General Waste", count: 142, percentage: 57.3 },
    { type: "Recyclables", count: 68, percentage: 27.4 },
    { type: "Green Waste", count: 32, percentage: 12.9 },
    { type: "Hazardous Waste", count: 6, percentage: 2.4 },
  ]

  return (
    <DashboardLayout userRole="collector">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Reports</h1>
            <p className="text-muted-foreground">Track your collection performance and metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last 90 Days</SelectItem>
                <SelectItem value="year">Last 12 Months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collections Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceMetrics.collectionsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8.2%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceMetrics.onTimeRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+1.5%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceMetrics.clientSatisfaction}/5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+0.2</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceMetrics.wasteCollected}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.3%</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" onValueChange={setReportType} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Your collection performance over time</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-16 w-16" />
                  <p>Performance trend chart would be displayed here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>On-Time Performance</CardTitle>
                  <CardDescription>Collection timeliness metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PieChart className="h-16 w-16" />
                    <p>On-time performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Feedback</CardTitle>
                  <CardDescription>Ratings and comments from clients</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Client feedback chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collections" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Collection Breakdown</CardTitle>
                    <CardDescription>Types of waste collected</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center mb-6">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PieChart className="h-16 w-16" />
                    <p>Collection type chart would be displayed here</p>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Waste Type</div>
                    <div>Collections</div>
                    <div>Percentage</div>
                    <div>Trend</div>
                  </div>
                  {collectionTypes.map((type) => (
                    <div key={type.type} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                      <div className="font-medium">{type.type}</div>
                      <div>{type.count}</div>
                      <div>{type.percentage}%</div>
                      <div className="text-green-500">↑ 3.2%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Collections by Area</CardTitle>
                  <CardDescription>Distribution across districts</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Area distribution chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collections by Day</CardTitle>
                  <CardDescription>Distribution across weekdays</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Day distribution chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Efficiency Metrics</CardTitle>
                    <CardDescription>Time and resource utilization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Average Collection Time</span>
                        <span>{performanceMetrics.averageCompletionTime}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Target: 15 minutes</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Collections Per Day</span>
                        <span>{performanceMetrics.collectionsPerDay}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Target: 15 collections</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Fuel Efficiency</span>
                        <span>{performanceMetrics.fuelEfficiency}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Target: 12 miles/gallon</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Recycling Rate</span>
                        <span>{performanceMetrics.recyclingRate}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "77%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Target: 50%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 h-[200px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-16 w-16" />
                    <p>Efficiency trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Optimization</CardTitle>
                <CardDescription>Analyze and improve your collection routes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-16 w-16" />
                  <p>Route optimization map would be displayed here</p>
                  <p className="text-sm">Showing potential time and fuel savings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your performance reports history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                <div>Report Name</div>
                <div>Generated</div>
                <div>Type</div>
                <div>Actions</div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 border-b">
                <div className="font-medium">Monthly Performance Summary</div>
                <div>May 15, 2025</div>
                <div>Performance</div>
                <div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 border-b">
                <div className="font-medium">Route Efficiency Analysis</div>
                <div>April 10, 2025</div>
                <div>Efficiency</div>
                <div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="font-medium">Quarterly Collection Report</div>
                <div>April 1, 2025</div>
                <div>Collections</div>
                <div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

