"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { jobAPI } from "@/lib/api"
import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, User } from "lucide-react"

export default function JobDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = (await jobAPI.getById(id as string)) as Job
        setJob(data)
        setApplied(data.applicants?.includes(user?._id || "") || false)
      } catch (error) {
        console.error("Failed to fetch job:", error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchJob()
  }, [id, user?._id])

  const handleApply = async () => {
    setApplying(true)
    try {
      await jobAPI.apply(id as string)
      setApplied(true)
    } catch (error) {
      console.error("Failed to apply:", error)
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!job) return <div className="container mx-auto px-4 py-8">Job not found</div>

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </span>
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Posted by {job.postedBy?.name}
                  </span>
                </CardDescription>
              </div>
              <Badge>{job.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </div>
            {job.skillsRequired?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Skills Required</h3>
                <div className="flex gap-2 flex-wrap">
                  {job.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {user?.role === "student" && (
              <Button onClick={handleApply} disabled={applying || applied} className="w-full">
                {applied ? "Already Applied" : applying ? "Applying..." : "Apply Now"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
