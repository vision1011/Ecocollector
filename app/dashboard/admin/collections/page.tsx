"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Filter, MapPin, Plus, Search, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useForm } from "react-hook-form"

export default function AdminCollectionsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for collections
  const collections = [
    {
      id: 1,
      client: "John Doe",
      type: "General Waste",
      date: "May 18, 2025",
      time: "9:00 AM",
      address: "123 Main Street",
      collector: "Mike Brown",
      status: "scheduled",
    },
    {
      id: 2,
      client: "Emily Smith",
      type: "Recyclables",
      date: "May 18, 2025",
      time: "10:30 AM",
      address: "456 Oak Avenue",
      collector: "Sarah Johnson",
      status: "scheduled",
    },
    {
      id: 3,
      client: "Michael Johnson",
      type: "Green Waste",
      date: "May 18, 2025",
      time: "1:00 PM",
      address: "789 Pine Road",
      collector: "Lisa Davis",
      status: "scheduled",
    },
    {
      id: 4,
      client: "Sarah Williams",
      type: "General Waste",
      date: "May 19, 2025",
      time: "9:00 AM",
      address: "321 Elm Street",
      collector: "John Smith",
      status: "scheduled",
    },
    {
      id: 5,
      client: "David Brown",
      type: "Hazardous Waste",
      date: "May 19, 2025",
      time: "11:00 AM",
      address: "654 Maple Drive",
      collector: "Mike Brown",
      status: "scheduled",
    },
    {
      id: 6,
      client: "Jennifer Davis",
      type: "Recyclables",
      date: "May 19, 2025",
      time: "2:00 PM",
      address: "987 Cedar Lane",
      collector: "Sarah Johnson",
      status: "scheduled",
    },
    {
      id: 7,
      client: "Robert Wilson",
      type: "General Waste",
      date: "May 20, 2025",
      time: "9:00 AM",
      address: "135 Birch Court",
      collector: "Lisa Davis",
      status: "scheduled",
    },
    {
      id: 8,
      client: "Lisa Miller",
      type: "Green Waste",
      date: "May 20, 2025",
      time: "10:30 AM",
      address: "246 Spruce Way",
      collector: "John Smith",
      status: "scheduled",
    },
  ]

  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [wasteType, setWasteType] = useState("all")
  const [collectorFilter, setCollectorFilter] = useState("all")

  // Filter collections based on search query, waste type, and collector
  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      wasteType === "all" ||
      (wasteType === "general" && collection.type === "General Waste") ||
      (wasteType === "recyclables" && collection.type === "Recyclables") ||
      (wasteType === "green" && collection.type === "Green Waste") ||
      (wasteType === "hazardous" && collection.type === "Hazardous Waste")

    const matchesCollector = collectorFilter === "all" || collection.collector === collectorFilter

    return matchesSearch && matchesType && matchesCollector
  })

  // Form for adding a new collection
  const form = useForm({
    defaultValues: {
      client: "",
      type: "",
      date: "",
      time: "",
      address: "",
      collector: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // In a real app, this would send the data to the server
  }

  // Get unique collectors for filter dropdown
  const collectors = [...new Set(collections.map((c) => c.collector))]

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collections Management</h1>
            <p className="text-muted-foreground">Schedule and manage waste collections</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Schedule New Collection</DialogTitle>
                <DialogDescription>Create a new waste collection assignment</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select client" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="john_doe">John Doe</SelectItem>
                              <SelectItem value="emily_smith">Emily Smith</SelectItem>
                              <SelectItem value="michael_johnson">Michael Johnson</SelectItem>
                              <SelectItem value="sarah_williams">Sarah Williams</SelectItem>
                              <SelectItem value="david_brown">David Brown</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waste Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select waste type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Waste</SelectItem>
                              <SelectItem value="recyclables">Recyclables</SelectItem>
                              <SelectItem value="green">Green Waste</SelectItem>
                              <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                              <SelectItem value="bulky">Bulky Items</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collection Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collection Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="10:30">10:30 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:30">1:30 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="collector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign Collector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select collector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="john_smith">John Smith</SelectItem>
                            <SelectItem value="sarah_johnson">Sarah Johnson</SelectItem>
                            <SelectItem value="mike_brown">Mike Brown</SelectItem>
                            <SelectItem value="lisa_davis">Lisa Davis</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions for the collector"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional: Include any details that might help the collector</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Schedule Collection</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <CardTitle>Scheduled Collections</CardTitle>
                  <CardDescription>View and manage all waste collections</CardDescription>
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
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Waste Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="general">General Waste</SelectItem>
                    <SelectItem value="recyclables">Recyclables</SelectItem>
                    <SelectItem value="green">Green Waste</SelectItem>
                    <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={collectorFilter} onValueChange={setCollectorFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Collector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Collectors</SelectItem>
                    {collectors.map((collector) => (
                      <SelectItem key={collector} value={collector}>
                        {collector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Client & Address</div>
                  <div>Type</div>
                  <div>Date & Time</div>
                  <div>Collector</div>
                  <div>Status</div>
                </div>
                {filteredCollections.length > 0 ? (
                  filteredCollections.map((collection) => (
                    <div key={collection.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{collection.client}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {collection.address}
                        </div>
                      </div>
                      <div>{collection.type}</div>
                      <div>
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {collection.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {collection.time}
                        </div>
                      </div>
                      <div>{collection.collector}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Scheduled</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No collections found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Calendar</CardTitle>
              <CardDescription>View scheduled collections by date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-4">
                <h4 className="font-medium mb-2">Collections on {date?.toLocaleDateString()}</h4>
                <div className="space-y-2">
                  {collections
                    .filter((c) => c.date === "May 18, 2025") // This would normally use the selected date
                    .map((collection, index) => (
                      <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted rounded-md">
                        <div className="flex items-center gap-1">
                          <Trash2 className="h-4 w-4" />
                          <span>{collection.type}</span>
                        </div>
                        <span>{collection.time}</span>
                      </div>
                    ))}
                  {collections.filter((c) => c.date === "May 18, 2025").length === 0 && (
                    <p className="text-center text-muted-foreground py-2">No collections scheduled for this date</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

