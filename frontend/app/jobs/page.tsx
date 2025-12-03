"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { jobAPI } from "@/lib/api"
import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Building, Plus, ExternalLink, Globe, Briefcase, RefreshCw } from "lucide-react"

interface ExternalJob {
  id: string
  title: string
  company: string
  location: string
  type: string
  skills: string[]
  url: string
  salary?: string
  description: string
  source: string
  postedAt: string
  isExternal: boolean
}

export default function JobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [externalJobs, setExternalJobs] = useState<ExternalJob[]>([])
  const [loading, setLoading] = useState(true)
  const [externalLoading, setExternalLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"community" | "external">("community")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = (await jobAPI.getAll()) as Job[]
        setJobs(data)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const fetchExternalJobs = async () => {
    setExternalLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/external/jobs?limit=30")
      const data = await response.json()
      if (data.success) {
        setExternalJobs(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch external jobs:", error)
    } finally {
      setExternalLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === "external" && externalJobs.length === 0) {
      fetchExternalJobs()
    }
  }, [activeTab])

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredExternalJobs = externalJobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              Job Opportunities
            </h1>
            <p className="text-muted-foreground mt-1">Discover career opportunities from our community and around the web</p>
          </div>
          {(user?.role === "alumni" || user?.role === "admin") && (
            <Link href="/jobs/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post Job
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
            <Building className="h-4 w-4" />
            Community Jobs
            <Badge variant="secondary" className="ml-1">{jobs.length}</Badge>
          </Button>
          <Button
            variant={activeTab === "external" ? "default" : "outline"}
            onClick={() => setActiveTab("external")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            India Jobs
            {externalJobs.length > 0 && (
              <Badge variant="secondary" className="ml-1">{externalJobs.length}</Badge>
            )}
          </Button>
          {activeTab === "external" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchExternalJobs}
              disabled={externalLoading}
              className="ml-auto"
            >
              <RefreshCw className={`h-4 w-4 ${externalLoading ? "animate-spin" : ""}`} />
            </Button>
          )}
        </div>

        {/* Search */}
        <Input
          placeholder="Search jobs by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 max-w-md"
        />

        {/* Community Jobs Tab */}
        {activeTab === "community" && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Community Jobs Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {user?.role === "alumni" || user?.role === "admin"
                    ? "Be the first to post a job opportunity for the community!"
                    : "Check back later or browse external job listings."}
                </p>
                {(user?.role === "alumni" || user?.role === "admin") && (
                  <Link href="/jobs/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Post a Job
                    </Button>
                  </Link>
                )}
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <Link key={job._id} href={`/jobs/${job._id}`}>
                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {job.title}
                              <Badge variant="outline" className="text-xs">Community</Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Building className="h-4 w-4" />
                              {job.company}
                              {job.location && (
                                <>
                                  <MapPin className="h-4 w-4 ml-2" />
                                  {job.location}
                                </>
                              )}
                            </CardDescription>
                          </div>
                          <Badge>{job.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 flex-wrap">
                          {job.skillsRequired?.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* External Jobs Tab */}
        {activeTab === "external" && (
          <>
            {externalLoading && externalJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Fetching jobs from external sources...</p>
              </div>
            ) : filteredExternalJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No External Jobs Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try refreshing to fetch the latest job listings.
                </p>
                <Button onClick={fetchExternalJobs} disabled={externalLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${externalLoading ? "animate-spin" : ""}`} />
                  Refresh Jobs
                </Button>
              </Card>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Showing <strong>{filteredExternalJobs.length}</strong> job opportunities in India.
                    Includes positions at top Indian companies and remote jobs available for India.
                  </p>
                </div>
                <div className="grid gap-4">
                  {filteredExternalJobs.map((job) => (
                    <a
                      key={job.id}
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {job.title}
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Building className="h-4 w-4" />
                                {job.company}
                                {job.location && (
                                  <>
                                    <MapPin className="h-4 w-4 ml-2" />
                                    {job.location}
                                  </>
                                )}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {job.source}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {job.skills?.slice(0, 5).map((skill, index) => (
                              <Badge key={`${skill}-${index}`} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                            {job.salary && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                {job.salary}
                              </Badge>
                            )}
                          </div>
                          {job.postedAt && (
                            <p className="text-xs text-muted-foreground mt-3">
                              Posted: {new Date(job.postedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          )}
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
