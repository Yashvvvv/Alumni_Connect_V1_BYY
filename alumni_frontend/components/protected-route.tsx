"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/types"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
    if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, loading, router, allowedRoles])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) return null
  if (allowedRoles && !allowedRoles.includes(user.role)) return null

  return <>{children}</>
}
