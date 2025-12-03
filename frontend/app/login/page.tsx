"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Shield, Users, Briefcase } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-login" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-login)" />
          </svg>
        </div>
        {/* Floating Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-md">
          {/* Illustration */}
          <svg viewBox="0 0 300 250" className="w-full mb-8">
            {/* Shield/Security */}
            <path d="M150 30 L200 50 L200 120 C200 160 150 200 150 200 C150 200 100 160 100 120 L100 50 Z" fill="#3B82F6" opacity="0.9"/>
            <path d="M150 50 L185 65 L185 115 C185 145 150 175 150 175 C150 175 115 145 115 115 L115 65 Z" fill="#1E293B"/>
            
            {/* Checkmark */}
            <path d="M130 110 L145 125 L175 90" stroke="#22C55E" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* User Icons */}
            <circle cx="60" cy="100" r="20" fill="#334155"/>
            <circle cx="60" cy="92" r="8" fill="#60A5FA"/>
            <ellipse cx="60" cy="115" rx="12" ry="8" fill="#60A5FA"/>
            
            <circle cx="240" cy="100" r="20" fill="#334155"/>
            <circle cx="240" cy="92" r="8" fill="#A855F7"/>
            <ellipse cx="240" cy="115" rx="12" ry="8" fill="#A855F7"/>
            
            {/* Connection Lines */}
            <line x1="85" y1="100" x2="100" y2="100" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 2"/>
            <line x1="200" y1="100" x2="215" y2="100" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2"/>
          </svg>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">AlumniConnect</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-slate-400 mb-6">
              Access your professional network and discover new opportunities.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-xl">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <p className="text-xs text-slate-400">10K+ Members</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <Briefcase className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <p className="text-xs text-slate-400">1.2K+ Jobs</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <Shield className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <p className="text-xs text-slate-400">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">AlumniConnect</span>
            </div>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
