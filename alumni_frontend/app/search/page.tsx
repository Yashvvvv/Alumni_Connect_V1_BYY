"use client"

import { useState } from "react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { searchAPI } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Briefcase, Calendar, Megaphone, User, FileText } from "lucide-react"

interface SearchResults {
  users: Array<{ _id: string; name: string; email: string; role: string }>
  profiles: Array<{
    _id: string
    headline?: string
    user?: { _id: string; name: string; email: string; role: string }
  }>
  jobs: Array<{
    _id: string
    title: string
    company: string
    type: string
    postedBy?: { name: string }
  }>
  events: Array<{
    _id: string
    title: string
    date: string
    venue?: string
    createdBy?: { name: string }
  }>
  announcements: Array<{
    _id: string
    title: string
    content: string
    createdBy?: { name: string }
  }>
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const res = await searchAPI.global(query)
      setResults(res.result)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalResults = results
    ? results.users.length +
      results.profiles.length +
      results.jobs.length +
      results.events.length +
      results.announcements.length
    : 0

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Search</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for people, jobs, events, announcements..."
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" disabled={loading} className="h-12 px-6">
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Searching...</p>
        )}

        {!loading && searched && results && (
          <>
            <p className="text-center text-muted-foreground mb-6">
              Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
            </p>

            {totalResults === 0 ? (
              <Card className="max-w-md mx-auto">
                <CardContent className="py-12 text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-lg">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try different keywords or check your spelling
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="all" className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="all">
                    All ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="people">
                    People ({results.users.length + results.profiles.length})
                  </TabsTrigger>
                  <TabsTrigger value="jobs">
                    Jobs ({results.jobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    Events ({results.events.length})
                  </TabsTrigger>
                  <TabsTrigger value="announcements">
                    News ({results.announcements.length})
                  </TabsTrigger>
                </TabsList>

                {/* All Results */}
                <TabsContent value="all" className="space-y-6">
                  {/* People */}
                  {(results.users.length > 0 || results.profiles.length > 0) && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5" /> People
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {results.users.slice(0, 4).map((user) => (
                          <Link key={user._id} href={`/profile/${user._id}`}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4 flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <Badge variant="secondary">{user.role}</Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                        {results.profiles.slice(0, 4).map((profile) => (
                          <Link key={profile._id} href={`/profile/${profile.user?._id}`}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4 flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{profile.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{profile.user?.name}</p>
                                  <p className="text-sm text-muted-foreground truncate">{profile.headline}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jobs */}
                  {results.jobs.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="h-5 w-5" /> Jobs
                      </h3>
                      <div className="grid gap-3">
                        {results.jobs.slice(0, 3).map((job) => (
                          <Link key={job._id} href={`/jobs/${job._id}`}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-sm text-muted-foreground">{job.company}</p>
                                  </div>
                                  <Badge>{job.type}</Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  {results.events.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5" /> Events
                      </h3>
                      <div className="grid gap-3">
                        {results.events.slice(0, 3).map((event) => (
                          <Link key={event._id} href={`/events/${event._id}`}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString()}
                                  {event.venue && ` • ${event.venue}`}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Announcements */}
                  {results.announcements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Megaphone className="h-5 w-5" /> Announcements
                      </h3>
                      <div className="grid gap-3">
                        {results.announcements.slice(0, 3).map((ann) => (
                          <Link key={ann._id} href={`/announcements`}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <p className="font-medium">{ann.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {ann.content}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* People Tab */}
                <TabsContent value="people" className="space-y-3">
                  {results.users.map((user) => (
                    <Link key={user._id} href={`/profile/${user._id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge>{user.role}</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {results.profiles.map((profile) => (
                    <Link key={profile._id} href={`/profile/${profile.user?._id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{profile.user?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{profile.user?.name}</p>
                            <p className="text-sm text-muted-foreground">{profile.headline}</p>
                          </div>
                          <Badge variant="secondary">{profile.user?.role}</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </TabsContent>

                {/* Jobs Tab */}
                <TabsContent value="jobs" className="space-y-3">
                  {results.jobs.map((job) => (
                    <Link key={job._id} href={`/jobs/${job._id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-muted-foreground">{job.company}</p>
                              {job.postedBy && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Posted by {job.postedBy.name}
                                </p>
                              )}
                            </div>
                            <Badge>{job.type}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="space-y-3">
                  {results.events.map((event) => (
                    <Link key={event._id} href={`/events/${event._id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                            {event.venue && ` • ${event.venue}`}
                          </p>
                          {event.createdBy && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Organized by {event.createdBy.name}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </TabsContent>

                {/* Announcements Tab */}
                <TabsContent value="announcements" className="space-y-3">
                  {results.announcements.map((ann) => (
                    <Card key={ann._id}>
                      <CardContent className="p-4">
                        <p className="font-medium">{ann.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{ann.content}</p>
                        {ann.createdBy && (
                          <p className="text-xs text-muted-foreground mt-2">
                            By {ann.createdBy.name}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </>
        )}

        {!searched && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">
              Search for people, jobs, events, and announcements
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
