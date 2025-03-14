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
import { CalendarClock, CreditCard, Home, MapPin, Phone, Plus, Search, Trash2, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useForm } from "react-hook-form"

export default function AdminClientsPage() {
  // Mock data for clients
  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      status: "active",
      plan: "Residential",
      joinDate: "Jan 15, 2025",
      lastCollection: "May 10, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Emily Smith",
      email: "emily.smith@example.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Avenue",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      status: "active",
      plan: "Residential Premium",
      joinDate: "Feb 3, 2025",
      lastCollection: "May 12, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Road",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      status: "active",
      plan: "Commercial",
      joinDate: "Mar 22, 2025",
      lastCollection: "May 15, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Street",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      status: "inactive",
      plan: "Residential",
      joinDate: "Apr 5, 2025",
      lastCollection: "May 8, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Drive",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      status: "active",
      plan: "Commercial Premium",
      joinDate: "Feb 18, 2025",
      lastCollection: "May 14, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  // Filter clients based on search query, status, and plan
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter

    const matchesPlan = planFilter === "all" || client.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  // Form for adding a new client
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      plan: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // In a real app, this would send the data to the server
  }

  // Get unique plans for filter dropdown
  const plans = [...new Set(clients.map((c) => c.plan))]

  // Selected client for details view
  const [selectedClient, setSelectedClient] = useState<number | null>(null)
  const clientDetails = clients.find((c) => c.id === selectedClient)

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">Manage your client accounts</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>Create a new client account</DialogDescription>
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
                      name="plan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Plan</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="residential_premium">Residential Premium</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="commercial_premium">Commercial Premium</SelectItem>
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Client</Button>
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
                  <CardTitle>Client Accounts</CardTitle>
                  <CardDescription>Manage your client base</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search clients..."
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
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Service Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    {plans.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
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
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedClient(client.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={client.avatar} alt={client.name} />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{client.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {client.address}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="mr-1 h-4 w-4" />
                              {client.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Badge
                            variant={client.status === "active" ? "outline" : "secondary"}
                            className={client.status === "active" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
                          >
                            {client.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                          <div className="text-sm font-medium">{client.plan}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="list" className="mt-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                      <div>Name</div>
                      <div>Address</div>
                      <div>Plan</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {filteredClients.map((client) => (
                      <div key={client.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                        <div className="font-medium">{client.name}</div>
                        <div>{client.address}</div>
                        <div>{client.plan}</div>
                        <div>
                          <Badge
                            variant={client.status === "active" ? "outline" : "secondary"}
                            className={client.status === "active" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
                          >
                            {client.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedClient(client.id)}>
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
            {selectedClient && clientDetails ? (
              <>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={clientDetails.avatar} alt={clientDetails.name} />
                      <AvatarFallback>{clientDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{clientDetails.name}</CardTitle>
                      <CardDescription>{clientDetails.plan}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 items-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{clientDetails.email}</span>
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{clientDetails.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 items-center">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span>{clientDetails.address}</span>
                      <div></div>
                      <span>
                        {clientDetails.city}, {clientDetails.state} {clientDetails.zip}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Account Details</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Join Date</div>
                        <div className="text-sm font-medium">{clientDetails.joinDate}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Last Collection</div>
                        <div className="text-sm font-medium">{clientDetails.lastCollection}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="text-sm font-medium capitalize">{clientDetails.status}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Plan</div>
                        <div className="text-sm font-medium">{clientDetails.plan}</div>
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
                        <Trash2 className="mr-2 h-4 w-4" /> Collection History
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <CreditCard className="mr-2 h-4 w-4" /> Billing
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
                <h3 className="text-lg font-medium mb-2">Client Details</h3>
                <p className="text-muted-foreground text-center">Select a client to view their details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

