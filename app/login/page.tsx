"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Recycle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("client")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would authenticate with a backend
    // For demo purposes, we'll just redirect based on role
    router.push(`/dashboard/${role}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-full">
              <Recycle className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Login to EcoCollect</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Login as</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="collector">Waste Collector</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full mb-4">
              Login
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

