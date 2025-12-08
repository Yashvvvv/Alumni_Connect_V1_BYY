"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { profileAPI } from "@/lib/api"
import type { Profile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = (await profileAPI.getMyProfile()) as Profile
        setProfile(data)
      } catch {
        // Profile doesn't exist yet
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    try {
      await profileAPI.createOrUpdate(profile)
      setMessage("Profile saved successfully!")
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const updateProfile = (field: string, value: string | number | boolean | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete your profile to help others learn more about you.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && (
                <div
                  className={`p-3 rounded border ${
                    message.includes("success") 
                      ? "bg-green-50 text-green-600 border-green-200" 
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={profile.headline || ""}
                  onChange={(e) => updateProfile("headline", e.target.value)}
                  placeholder="Software Engineer at Google"
                />
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={profile.bio || ""}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={profile.location || ""}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="space-y-2">
                <Label>Skills (comma separated)</Label>
                <Input
                  value={profile.skills?.join(", ") || ""}
                  onChange={(e) =>
                    updateProfile(
                      "skills",
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                  placeholder="JavaScript, React, Node.js"
                />
              </div>

              {(user?.role === "alumni" || user?.role === "admin") && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4">Professional Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Current Role</Label>
                        <Input
                          value={profile.currentRole || ""}
                          onChange={(e) => updateProfile("currentRole", e.target.value)}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input 
                          value={profile.company || ""} 
                          onChange={(e) => updateProfile("company", e.target.value)}
                          placeholder="Google" 
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Years of Experience</Label>
                          <Input
                            type="number"
                            value={profile.yearsOfExperience || ""}
                            onChange={(e) => updateProfile("yearsOfExperience", Number.parseInt(e.target.value))}
                            placeholder="5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Batch</Label>
                          <Input
                            value={profile.batch || ""}
                            onChange={(e) => updateProfile("batch", e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user?.role === "student" && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4">Academic Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Current Course</Label>
                        <Input
                          value={profile.currentCourse || ""}
                          onChange={(e) => updateProfile("currentCourse", e.target.value)}
                          placeholder="B.Tech Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Year of Study</Label>
                        <Input
                          type="number"
                          value={profile.yearOfStudy || ""}
                          onChange={(e) => updateProfile("yearOfStudy", Number.parseInt(e.target.value))}
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
