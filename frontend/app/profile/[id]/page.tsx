"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { profileAPI, connectionAPI } from "@/lib/api"
import type { Profile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Briefcase, Building } from "lucide-react"

export default function ProfileDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = (await profileAPI.getByUserId(id as string)) as Profile
        setProfile(data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProfile()
  }, [id])

  const handleConnect = async () => {
    setConnecting(true)
    try {
      await connectionAPI.send(id as string)
      setConnected(true)
    } catch (error) {
      console.error("Failed to send connection:", error)
    } finally {
      setConnecting(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!profile) return <div className="container mx-auto px-4 py-8">Profile not found</div>

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{profile.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{profile.user?.name}</CardTitle>
                <p className="text-muted-foreground">{profile.headline}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge>{profile.user?.role}</Badge>
                  {profile.location && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                </div>
              </div>
              {user?._id !== id && (
                <Button onClick={handleConnect} disabled={connecting || connected}>
                  {connected ? "Request Sent" : connecting ? "Sending..." : "Connect"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.bio && (
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            )}
            {profile.user?.role === "alumni" && (
              <div className="flex items-center gap-4 text-sm">
                {profile.currentRole && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {profile.currentRole}
                  </span>
                )}
                {profile.company && (
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {profile.company}
                  </span>
                )}
                {profile.batch && <Badge variant="outline">Batch {profile.batch}</Badge>}
              </div>
            )}
            {profile.skills?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex gap-2 flex-wrap">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
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
