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

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [reportType, setReportType] = useState("collections")
  const [timeFrame, setTimeFrame] = useState("month")

  // Mock data for charts would be here in a real app

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Analyze waste collection performance and trends</p>
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
              <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12.5%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.6 tons</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8.2%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.8%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+3.1%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">356</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.7%</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="collections" onValueChange={setReportType} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="waste">Waste Types</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="collections" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Collection Trends</CardTitle>
                    <CardDescription>Number of collections over time</CardDescription>
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
                  <BarChart3 className="h-16 w-16" />
                  <p>Collection trend chart would be displayed here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
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
                    <PieChart className="h-16 w-16" />
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

          <TabsContent value="waste" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Waste Composition</CardTitle>
                    <CardDescription>Breakdown of waste types collected</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <PieChart className="h-16 w-16" />
                  <p>Waste composition chart would be displayed here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recycling Trends</CardTitle>
                  <CardDescription>Recycling rates over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-16 w-16" />
                    <p>Recycling trend chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Volume by Area</CardTitle>
                  <CardDescription>Distribution across districts</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Area volume chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Collector Performance</CardTitle>
                    <CardDescription>Collections completed by collector</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-16 w-16" />
                  <p>Collector performance chart would be displayed here</p>
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
                  <CardTitle>Issues Reported</CardTitle>
                  <CardDescription>Problems encountered during collection</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Issues chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <CardTitle>Client Growth</CardTitle>
                    <CardDescription>New client acquisitions over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-16 w-16" />
                  <p>Client growth chart would be displayed here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Distribution</CardTitle>
                  <CardDescription>Breakdown by service plan</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PieChart className="h-16 w-16" />
                    <p>Client distribution chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Retention</CardTitle>
                  <CardDescription>Client retention rates over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-16 w-16" />
                    <p>Retention chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
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
                <div className="font-medium">Monthly Collection Summary</div>
                <div>May 15, 2025</div>
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
              <div className="grid grid-cols-4 gap-4 p-4 border-b">
                <div className="font-medium">Quarterly Waste Analysis</div>
                <div>April 1, 2025</div>
                <div>Waste</div>
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
                <div className="font-medium">Annual Performance Review</div>
                <div>January 5, 2025</div>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

