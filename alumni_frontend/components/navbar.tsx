"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { User, Briefcase, Calendar, Users, Bell, LayoutDashboard, LogOut, GraduationCap } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:inline">AlumniConnect</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-1 md:gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>
              <Link
                href="/directory"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Directory</span>
              </Link>
              <Link 
                href="/jobs" 
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden md:inline">Jobs</span>
              </Link>
              <Link 
                href="/events" 
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Events</span>
              </Link>
              <Link
                href="/announcements"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden lg:inline">Announcements</span>
              </Link>
              <Link
                href="/connections"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">Network</span>
              </Link>
              <div className="flex items-center gap-2 ml-2 pl-2 border-l">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
