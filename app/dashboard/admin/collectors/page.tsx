"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, CalendarClock, MapPin, Phone, Plus, Search, Truck, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useForm } from "react-hook-form"

export default function AdminCollectorsPage() {
  // Mock data for collectors
  const collectors = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@ecocollect.com",
      phone: "+1 (555) 123-4567",
      area: "North District",
      status: "active",
      collectionsToday: 5,
      collectionsTotal: 342,
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@ecocollect.com",
      phone: "+1 (555) 234-5678",
      area: "East District",
      status: "active",
      collectionsToday: 4,
      collectionsTotal: 287,
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike.brown@ecocollect.com",
      phone: "+1 (555) 345-6789",
      area: "West District",
      status: "active",
      collectionsToday: 6,
      collectionsTotal: 412,
      rating: 4.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Lisa Davis",
      email: "lisa.davis@ecocollect.com",
      phone: "+1 (555) 456-7890",
      area: "South District",
      status: "active",
      collectionsToday: 5,
      collectionsTotal: 298,
      rating: 4.6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.wilson@ecocollect.com",
      phone: "+1 (555) 567-8901",
      area: "Central District",
      status: "inactive",
      collectionsToday: 0,
      collectionsTotal: 156,
      rating: 4.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [areaFilter, setAreaFilter] = useState("all")

  // Filter collectors based on search query, status, and area
  const filteredCollectors = collectors.filter((collector) => {
    const matchesSearch =
      collector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collector.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collector.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || collector.status === statusFilter

    const matchesArea = areaFilter === "all" || collector.area === areaFilter

    return matchesSearch && matchesStatus && matchesArea
  })

  // Form for adding a new collector
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // In a real app, this would send the data to the server
  }

  // Get unique areas for filter dropdown
  const areas = [...new Set(collectors.map((c) => c.area))]

  // Selected collector for details view
  const [selectedCollector, setSelectedCollector] = useState<number | null>(null)
  const collectorDetails = collectors.find((c) => c.id === selectedCollector)

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Waste Collectors</h1>
            <p className="text-muted-foreground">Manage your collection team</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Collector
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Collector</DialogTitle>
                <DialogDescription>Create a new waste collector account</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assigned Area</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="north">North District</SelectItem>
                              <SelectItem value="east">East District</SelectItem>
                              <SelectItem value="west">West District</SelectItem>
                              <SelectItem value="south">South District</SelectItem>
                              <SelectItem value="central">Central District</SelectItem>
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Collector</Button>
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
                  <CardTitle>Waste Collectors</CardTitle>
                  <CardDescription>Manage your collection team</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search collectors..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid">
                <TabsList className="mb-4">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCollectors.map((collector) => (
                      <div
                        key={collector.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCollector(collector.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={collector.avatar} alt={collector.name} />
                            <AvatarFallback>{collector.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{collector.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {collector.area}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="mr-1 h-4 w-4" />
                              {collector.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Badge
                            variant={collector.status === "active" ? "outline" : "secondary"}
                            className={
                              collector.status === "active" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                            }
                          >
                            {collector.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                          <div className="text-sm">
                            <span className="font-medium">{collector.collectionsToday}</span> collections today
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="list" className="mt-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div>Name</div>
                      <div>Assigned Area</div>
                      <div>Status</div>
                      <div>Collections Today</div>
                      <div>Actions</div>
                    </div>
                    {filteredCollectors.map((collector) => (
                      <div
                        key={collector.id}
                        className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center"
                      >
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
                          <Button variant="outline" size="sm" onClick={() => setSelectedCollector(collector.id)}>
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

          <Card>
            {selectedCollector && collectorDetails ? (
              <>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={collectorDetails.avatar} alt={collectorDetails.name} />
                      <AvatarFallback>{collectorDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{collectorDetails.name}</CardTitle>
                      <CardDescription>{collectorDetails.area}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 items-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{collectorDetails.email}</span>
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{collectorDetails.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Performance</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Today</div>
                        <div className="text-xl font-bold">{collectorDetails.collectionsToday}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="text-xl font-bold">{collectorDetails.collectionsTotal}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <div className="text-xl font-bold">{collectorDetails.rating}/5</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="text-xl font-bold capitalize">{collectorDetails.status}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        <CalendarClock className="mr-2 h-4 w-4" /> View Schedule
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Truck className="mr-2 h-4 w-4" /> Assign Route
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" /> Performance
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <User className="mr-2 h-4 w-4" /> Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 h-full">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Collector Details</h3>
                <p className="text-muted-foreground text-center">Select a collector to view their details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

