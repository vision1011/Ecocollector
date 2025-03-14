"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { CalendarIcon, Clock, Download, FileText, Search, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientHistoryPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1), // April 1, 2025
    to: new Date(), // Today
  })

  // Mock data for collection history
  const collectionHistory = [
    {
      id: 101,
      type: "General Waste",
      date: "May 10, 2025",
      time: "9:05 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "15 kg",
    },
    {
      id: 102,
      type: "Recyclables",
      date: "May 5, 2025",
      time: "9:12 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "8 kg",
    },
    {
      id: 103,
      type: "General Waste",
      date: "April 26, 2025",
      time: "9:00 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "12 kg",
    },
    {
      id: 104,
      type: "Green Waste",
      date: "April 20, 2025",
      time: "10:15 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "20 kg",
    },
    {
      id: 105,
      type: "General Waste",
      date: "April 12, 2025",
      time: "9:08 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "14 kg",
    },
    {
      id: 106,
      type: "Recyclables",
      date: "April 7, 2025",
      time: "9:15 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "7 kg",
    },
    {
      id: 107,
      type: "General Waste",
      date: "March 29, 2025",
      time: "9:02 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "16 kg",
    },
    {
      id: 108,
      type: "Hazardous Waste",
      date: "March 15, 2025",
      time: "11:30 AM",
      address: "123 Main Street",
      status: "completed",
      weight: "5 kg",
    },
  ]

  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [wasteType, setWasteType] = useState("all")

  // Filter collections based on search query and waste type
  const filteredCollections = collectionHistory.filter((collection) => {
    const matchesSearch =
      collection.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      wasteType === "all" ||
      (wasteType === "general" && collection.type === "General Waste") ||
      (wasteType === "recyclables" && collection.type === "Recyclables") ||
      (wasteType === "green" && collection.type === "Green Waste") ||
      (wasteType === "hazardous" && collection.type === "Hazardous Waste")

    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collection History</h1>
            <p className="text-muted-foreground">View your past waste collection services</p>
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <CardTitle>Collection Records</CardTitle>
                  <CardDescription>Your past waste collection services</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search collections..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={wasteType} onValueChange={setWasteType}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="general">General Waste</SelectItem>
                      <SelectItem value="recyclables">Recyclables</SelectItem>
                      <SelectItem value="green">Green Waste</SelectItem>
                      <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Date & Time</div>
                  <div>Weight</div>
                  <div>Actions</div>
                </div>
                {filteredCollections.length > 0 ? (
                  filteredCollections.map((collection) => (
                    <div key={collection.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="col-span-2 flex items-center gap-2">
                        <div className="bg-muted p-2 rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{collection.type}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {collection.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {collection.time}
                        </div>
                      </div>
                      <div>{collection.weight}</div>
                      <div>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No collection records found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
              <CardDescription>Filter by collection date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                  <span className="text-sm">
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </span>
                </div>
                <Calendar mode="range" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Collection Summary</h3>
                <div className="space-y-2">
                  <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm">Total Collections</span>
                    <span className="font-bold">{filteredCollections.length}</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm">General Waste</span>
                    <span className="font-bold">
                      {filteredCollections.filter((c) => c.type === "General Waste").length}
                    </span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm">Recyclables</span>
                    <span className="font-bold">
                      {filteredCollections.filter((c) => c.type === "Recyclables").length}
                    </span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm">Total Weight</span>
                    <span className="font-bold">
                      {filteredCollections.reduce((total, current) => {
                        const weight = Number.parseInt(current.weight.split(" ")[0])
                        return total + weight
                      }, 0)}{" "}
                      kg
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

