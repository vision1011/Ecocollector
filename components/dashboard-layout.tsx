"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Recycle,
  Settings,
  Truck,
  Users,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "client" | "admin" | "collector"
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Navigation items based on user role
  const navigationItems = {
    client: [
      { name: "Dashboard", href: "/dashboard/client", icon: Home },
      { name: "Schedule", href: "/dashboard/client/schedule", icon: Calendar },
      { name: "History", href: "/dashboard/client/history", icon: ClipboardList },
      { name: "Messages", href: "/dashboard/client/messages", icon: MessageSquare },
      { name: "Settings", href: "/dashboard/client/settings", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Home },
      { name: "Collections", href: "/dashboard/admin/collections", icon: Truck },
      { name: "Collectors", href: "/dashboard/admin/collectors", icon: Users },
      { name: "Clients", href: "/dashboard/admin/clients", icon: Users },
      { name: "Reports", href: "/dashboard/admin/reports", icon: ClipboardList },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    collector: [
      { name: "Dashboard", href: "/dashboard/collector", icon: Home },
      { name: "Route", href: "/dashboard/collector/route", icon: Truck },
      { name: "Schedule", href: "/dashboard/collector/schedule", icon: Calendar },
      { name: "Reports", href: "/dashboard/collector/reports", icon: ClipboardList },
      { name: "Messages", href: "/dashboard/collector/messages", icon: MessageSquare },
      { name: "Settings", href: "/dashboard/collector/settings", icon: Settings },
    ],
  }

  const navItems = navigationItems[userRole]

  // User info based on role
  const userInfo = {
    client: { name: "John Doe", email: "john.doe@example.com", role: "Client" },
    admin: { name: "Admin User", email: "admin@ecocollect.com", role: "Administrator" },
    collector: { name: "Mike Brown", email: "mike.brown@ecocollect.com", role: "Waste Collector" },
  }

  const user = userInfo[userRole]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Recycle className="h-6 w-6" />
                  <span>EcoCollect</span>
                </Link>
              </div>
              <nav className="grid gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Recycle className="h-6 w-6" />
            <span className="hidden md:inline-block">EcoCollect</span>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.role}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:flex md:flex-col">
          <nav className="grid gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <Link href="/login">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

