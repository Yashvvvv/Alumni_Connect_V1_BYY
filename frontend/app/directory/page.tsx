"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { profileAPI } from "@/lib/api"
import type { Profile } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DirectoryPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = (await profileAPI.search({})) as Profile[]
        setProfiles(data)
      } catch (error) {
        console.error("Failed to fetch profiles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfiles()
  }, [])

  const filteredProfiles = profiles.filter(
    (p) =>
      p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.headline?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Member Directory</h1>
        <Input
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 max-w-md"
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <Link key={profile._id} href={`/profile/${profile.user?._id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{profile.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{profile.user?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{profile.headline}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{profile.user?.role}</Badge>
                    {profile.location && <p className="text-sm mt-2">{profile.location}</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
