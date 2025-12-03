"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { connectionAPI } from "@/lib/api"
import type { Connection } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"

export default function ConnectionsPage() {
  const { user } = useAuth()
  const [connections, setConnections] = useState<Connection[]>([])
  const [pending, setPending] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [conns, pend] = await Promise.all([
        connectionAPI.getAll() as Promise<Connection[]>,
        connectionAPI.getPending() as Promise<Connection[]>,
      ])
      setConnections(conns)
      setPending(pend)
    } catch (error) {
      console.error("Failed to fetch connections:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAccept = async (id: string) => {
    try {
      await connectionAPI.accept(id)
      fetchData()
    } catch (error) {
      console.error("Failed to accept:", error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await connectionAPI.reject(id)
      fetchData()
    } catch (error) {
      console.error("Failed to reject:", error)
    }
  }

  const getConnectionUser = (conn: Connection) => {
    return conn.requester._id === user?._id ? conn.recipient : conn.requester
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Network</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Tabs defaultValue="connections">
            <TabsList>
              <TabsTrigger value="connections">Connections ({connections.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="connections" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connections.map((conn) => {
                  const connUser = getConnectionUser(conn)
                  return (
                    <Card key={conn._id}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar>
                          <AvatarFallback>{connUser.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{connUser.name}</p>
                          <p className="text-sm text-muted-foreground">{connUser.email}</p>
                          <Badge variant="secondary" className="mt-1">
                            {connUser.role}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pending.map((conn) => (
                  <Card key={conn._id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{conn.requester.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{conn.requester.name}</p>
                          <p className="text-sm text-muted-foreground">{conn.requester.email}</p>
                          <Badge variant="secondary">{conn.requester.role}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleAccept(conn._id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(conn._id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ProtectedRoute>
  )
}
