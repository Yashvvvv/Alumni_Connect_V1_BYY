"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { eventAPI } from "@/lib/api"
import type { Event, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, UserIcon, Trash2 } from "lucide-react"

export default function EventDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [participants, setParticipants] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventAPI.getById(id as string)
        // Backend returns { event: {...} }
        const eventData = (res as any).event || res
        setEvent(eventData)
        
        // Check registration status
        const registeredUsers = eventData.registeredUsers || []
        const isRegistered = registeredUsers.some((reg: any) => {
          if (typeof reg === 'string') return reg === user?._id
          if (reg.user) {
            return typeof reg.user === 'string' ? reg.user === user?._id : reg.user._id === user?._id
          }
          return false
        })
        setRegistered(isRegistered)
        
        if (user?.role === "admin" || user?.role === "alumni") {
          try {
            const partsRes = await eventAPI.getParticipants(id as string)
            // Backend returns { participants: [...] }
            const partsData = (partsRes as any).participants || partsRes
            setParticipants(Array.isArray(partsData) ? partsData.map((p: any) => p.user || p) : [])
          } catch {
            // User might not have permission to view participants
          }
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return
    
    setDeleting(true)
    setDeleteError(null)

    try {
      await eventAPI.delete(id as string)
      router.push("/events")
    } catch (err: any) {
      console.error("Failed to delete event:", err)
      setDeleteError(err?.message || "Failed to delete this event. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  // Check if user can delete (admin or event creator)
  const canDelete = user && event && (
    user.role === "admin" || 
    (event.createdBy && event.createdBy._id === user._id)
  )

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

            {canDelete && (
              <div className="space-y-2 pt-4 border-t">
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {deleting ? "Deleting..." : "Delete Event"}
                </Button>
                {deleteError && (
                  <p className="text-sm text-destructive text-center">{deleteError}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
