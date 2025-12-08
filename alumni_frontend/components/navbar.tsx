"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { User, Briefcase, Calendar, Users, Bell, LayoutDashboard, LogOut, GraduationCap, FileText, MessageSquare, Search } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="hidden sm:inline">AlumniConnect</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-thin">
              <Link
                href="/search"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <Search className="h-4 w-4" />
                <span className="hidden xl:inline">Search</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
              <Link
                href="/directory"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <Users className="h-4 w-4" />
                <span className="hidden lg:inline">Directory</span>
              </Link>
              <Link 
                href="/jobs" 
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden lg:inline">Jobs</span>
              </Link>
              <Link 
                href="/events" 
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden lg:inline">Events</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden xl:inline">Chat</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden xl:inline">Alerts</span>
              </Link>
              <Link
                href="/connections"
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-1.5 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <User className="h-4 w-4" />
                <span className="hidden xl:inline">Network</span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 pl-1 sm:pl-2 border-l">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="gap-1 h-8 sm:h-9 px-2 sm:px-3">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-600 h-8 sm:h-9 px-2">
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
