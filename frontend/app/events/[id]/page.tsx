"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { eventAPI } from "@/lib/api"
import type { Event, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, UserIcon } from "lucide-react"

export default function EventDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [participants, setParticipants] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = (await eventAPI.getById(id as string)) as Event
        setEvent(data)
        setRegistered(data.registeredUsers?.includes(user?._id || "") || false)
        if (user?.role === "admin" || user?.role === "alumni") {
          const parts = (await eventAPI.getParticipants(id as string)) as User[]
          setParticipants(parts)
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchEvent()
  }, [id, user])

  const handleRegister = async () => {
    setRegistering(true)
    try {
      await eventAPI.register(id as string)
      setRegistered(true)
    } catch (error) {
      console.error("Failed to register:", error)
    } finally {
      setRegistering(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!event) return <div className="container mx-auto px-4 py-8">Event not found</div>

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.venue}
                  </span>
                </CardDescription>
              </div>
              <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              Created by {event.createdBy?.name}
            </div>
            {(user?.role === "student" || user?.role === "alumni") && event.status === "upcoming" && (
              <Button onClick={handleRegister} disabled={registering || registered} className="w-full">
                {registered ? "Already Registered" : registering ? "Registering..." : "Register for Event"}
              </Button>
            )}
            {(user?.role === "admin" || user?.role === "alumni") && participants.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Participants ({participants.length})</h3>
                <div className="space-y-2">
                  {participants.map((p) => (
                    <div key={p._id} className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{p.role}</Badge>
                      {p.name} - {p.email}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
