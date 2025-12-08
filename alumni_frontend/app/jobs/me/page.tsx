"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { jobAPI } from "@/lib/api"
import type { Job } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Trash2 } from "lucide-react"
import ApplicantModal from "./_components/applicant-model"

export default function MyPostedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedApplicants, setSelectedApplicants] = useState<any[] | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchMyJobs()
  }, [])

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

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) return
    
    setDeletingId(jobId)
    try {
      await jobAPI.delete(jobId)
      setJobs(jobs.filter(job => job._id !== jobId))
    } catch (err: any) {
      alert(err?.message || "Failed to delete job")
    } finally {
      setDeletingId(null)
    }
  }

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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Applicants: <strong>{job.applicants?.length || 0}</strong>
                    </p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 flex-1 sm:flex-initial"
                      onClick={() => setSelectedApplicants(job.applicants || [])}
                    >
                      <Users className="h-4 w-4" />
                      View Applicants
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === job._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
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
