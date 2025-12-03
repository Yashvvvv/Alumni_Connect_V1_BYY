"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { jobAPI } from "@/lib/api"
import type { Job } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import ApplicantModal from "./_components/applicant-model"

export default function MyPostedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedApplicants, setSelectedApplicants] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await jobAPI.getMyPosted()
        setJobs(res.jobs || [])
      } catch (err: any) {
        setError("Failed to load your posted jobs.")
      } finally {
        setLoading(false)
      }
    }

    fetchMyJobs()
  }, [])

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && jobs.length === 0 && (
          <Card className="p-8 text-center">
            <CardTitle>No Jobs Posted Yet</CardTitle>
            <CardDescription>You have not posted any jobs yet.</CardDescription>
          </Card>
        )}

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>

                  <Badge>{job.type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Applicants: <strong>{job.applicants?.length || 0}</strong>
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedApplicants(job.applicants || [])}
                  >
                    <Users className="h-4 w-4" />
                    View Applicants
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedApplicants && (
          <ApplicantModal
            applicants={selectedApplicants}
            onClose={() => setSelectedApplicants(null)}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}
