"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Mail, User } from "lucide-react"

export default function ApplicantModal({ applicants, onClose }: { applicants: any[], onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <Card className="w-full max-w-md p-0">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Applicants ({applicants.length})</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
          {applicants.map((app, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 bg-muted/30 flex flex-col gap-1"
            >
              <div className="flex gap-2 items-center">
                <User className="h-4 w-4 text-blue-500" />
                <p className="font-medium">{app.name || "Unnamed User"}</p>
              </div>

              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <p>{app.email || "No email"}</p>
              </div>

              <p className="text-xs text-muted-foreground">
                Role: <strong>{app.role || "N/A"}</strong>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
