"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { jobAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateJobPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skillsRequired: "",
    location: "",
    type: "Full-time",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await jobAPI.create({
        ...form,
        skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()),
      })
      router.push("/jobs")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["alumni", "admin"]}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Post a Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</div>}
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Skills Required (comma separated)</Label>
                <Input
                  value={form.skillsRequired}
                  onChange={(e) => setForm((f) => ({ ...f, skillsRequired: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select value={form.type} onValueChange={(value) => setForm((f) => ({ ...f, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
