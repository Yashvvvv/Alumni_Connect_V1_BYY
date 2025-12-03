"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { eventAPI } from "@/lib/api"
import type { Event } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Plus, ExternalLink, Globe, Users, RefreshCw, Clock, Video, Building } from "lucide-react"

interface ExternalEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  type: string
  url: string
  organizer: string
  source: string
  isOnline: boolean
  isExternal: boolean
}

export default function EventsPage() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [externalEvents, setExternalEvents] = useState<ExternalEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [externalLoading, setExternalLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"community" | "external">("community")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = (await eventAPI.getAll()) as Event[]
        setEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const fetchExternalEvents = async () => {
    setExternalLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/external/events?limit=30")
      const data = await response.json()
      if (data.success) {
        setExternalEvents(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch external events:", error)
    } finally {
      setExternalLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === "external" && externalEvents.length === 0) {
      fetchExternalEvents()
    }
  }, [activeTab])

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredExternalEvents = externalEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.organizer?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              Events
            </h1>
            <p className="text-muted-foreground mt-1">Discover networking events, webinars, and tech conferences</p>
          </div>
          {(user?.role === "alumni" || user?.role === "admin") && (
            <Link href="/events/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "community" ? "default" : "outline"}
            onClick={() => setActiveTab("community")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Community Events
            <Badge variant="secondary" className="ml-1">{events.length}</Badge>
          </Button>
          <Button
            variant={activeTab === "external" ? "default" : "outline"}
            onClick={() => setActiveTab("external")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            India Events
            {externalEvents.length > 0 && (
              <Badge variant="secondary" className="ml-1">{externalEvents.length}</Badge>
            )}
          </Button>
          {activeTab === "external" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchExternalEvents}
              disabled={externalLoading}
              className="ml-auto"
            >
              <RefreshCw className={`h-4 w-4 ${externalLoading ? "animate-spin" : ""}`} />
            </Button>
          )}
        </div>

        {/* Search */}
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 max-w-md"
        />

        {/* Community Events Tab */}
        {activeTab === "community" && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Community Events Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {user?.role === "alumni" || user?.role === "admin"
                    ? "Be the first to create an event for the community!"
                    : "Check back later or browse external tech events."}
                </p>
                {(user?.role === "alumni" || user?.role === "admin") && (
                  <Link href="/events/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                )}
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <Link key={event._id} href={`/events/${event._id}`}>
                    <Card className="hover:shadow-md transition-shadow h-full border-t-4 border-t-purple-500">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                        </div>
                        <CardDescription>{event.description?.substring(0, 100)}...</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.venue}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* External Events Tab */}
        {activeTab === "external" && (
          <>
            {externalLoading && externalEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mb-4" />
                <p className="text-muted-foreground">Fetching tech events and conferences...</p>
              </div>
            ) : filteredExternalEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No External Events Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try refreshing to fetch the latest tech events.
                </p>
                <Button onClick={fetchExternalEvents} disabled={externalLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${externalLoading ? "animate-spin" : ""}`} />
                  Refresh Events
                </Button>
              </Card>
            ) : (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <p className="text-sm text-purple-800">
                    Showing <strong>{filteredExternalEvents.length}</strong> tech events in India.
                    Includes conferences, meetups, and workshops across major Indian cities.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredExternalEvents.map((event) => (
                    <a
                      key={event.id}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-shadow h-full border-t-4 border-t-green-500">
                        <CardHeader>
                          <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {event.title}
                              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            </CardTitle>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge className={event.isOnline ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}>
                              {event.isOnline ? (
                                <><Video className="h-3 w-3 mr-1" /> Online</>
                              ) : (
                                <><Building className="h-3 w-3 mr-1" /> In-Person</>
                              )}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.source}
                            </Badge>
                          </div>
                          <CardDescription className="mt-2">
                            {event.description?.substring(0, 100)}...
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-purple-500" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-purple-500" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-purple-500" />
                              {event.venue}
                            </span>
                            <span className="flex items-center gap-2 text-xs">
                              <Users className="h-3 w-3" />
                              Organized by: {event.organizer}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
