"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus, Clock, MapPin, Plus, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useForm } from "react-hook-form"

export default function ClientSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTab, setSelectedTab] = useState("upcoming")

  // Mock data for scheduled collections
  const scheduledCollections = [
    {
      id: 1,
      type: "General Waste",
      date: "May 18, 2025",
      time: "9:00 AM",
      address: "123 Main Street",
      status: "scheduled",
    },
    {
      id: 2,
      type: "Recyclables",
      date: "May 20, 2025",
      time: "9:00 AM",
      address: "123 Main Street",
      status: "scheduled",
    },
    {
      id: 3,
      type: "Green Waste",
      date: "May 25, 2025",
      time: "10:00 AM",
      address: "123 Main Street",
      status: "scheduled",
    },
    {
      id: 4,
      type: "General Waste",
      date: "June 1, 2025",
      time: "9:00 AM",
      address: "123 Main Street",
      status: "scheduled",
    },
  ]

  // Mock data for recurring collections
  const recurringCollections = [
    { id: 101, type: "General Waste", frequency: "Weekly", day: "Monday", time: "9:00 AM", address: "123 Main Street" },
    {
      id: 102,
      type: "Recyclables",
      frequency: "Bi-weekly",
      day: "Wednesday",
      time: "9:00 AM",
      address: "123 Main Street",
    },
    {
      id: 103,
      type: "Green Waste",
      frequency: "Monthly",
      day: "Last Friday",
      time: "10:00 AM",
      address: "123 Main Street",
    },
  ]

  // Form for scheduling a new collection
  const form = useForm({
    defaultValues: {
      type: "",
      date: "",
      time: "",
      address: "123 Main Street",
      notes: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // In a real app, this would send the data to the server
  }

  return (
    <DashboardLayout userRole="client">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collection Schedule</h1>
            <p className="text-muted-foreground">Manage your waste collection schedule</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Schedule Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Collection</DialogTitle>
                <DialogDescription>Request a new waste collection service</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
                            <SelectItem value="bulky">Bulky Items</SelectItem>
                            <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                            <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
    <CardTitle>Collection Schedule</CardTitle>
    <CardDescription>View and manage your upcoming collections</CardDescription>
    <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="recurring">Recurring</TabsTrigger>
      </TabsList>

      {/* Make sure TabsContent is a direct child of Tabs */}
      <TabsContent value="upcoming" className="mt-0">
        <div className="space-y-4">
          {scheduledCollections.map((collection) => (
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
                    {collection.date}, {collection.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {collection.address}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Scheduled</Badge>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="destructive" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recurring" className="mt-0">
        <div className="space-y-4">
          {recurringCollections.map((collection) => (
            <div
              key={collection.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{collection.type}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {collection.frequency} on {collection.day}, {collection.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {collection.address}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </CardHeader>
  <CardContent>
    {/* TabsContent is already inside Tabs, so this should work */}
  </CardContent>
</Card>

        </div>
      </div>
    </DashboardLayout>
  )
}

