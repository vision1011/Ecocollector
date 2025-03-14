import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarClock, Recycle, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6" />
            <h1 className="text-xl font-bold">EcoCollect</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 bg-gradient-to-b from-primary/20 to-background">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Smart Waste Management</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground">
              Streamline your waste collection with our efficient scheduling system
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register?role=client">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <CalendarClock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-muted-foreground">Optimize collection routes and schedules for maximum efficiency</p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Tailored interfaces for clients, administrators, and waste collectors
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor collection status and receive notifications in real-time
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoCollect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

