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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, BookOpen, Award, Rocket, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await register(name, email, password, role)
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 items-center justify-center relative overflow-hidden">
        {/* Wave Decoration */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.1)" d="M0,200 C360,300 720,100 1080,200 C1260,250 1380,220 1440,200 L1440,400 L0,400 Z"/>
            <path fill="rgba(255,255,255,0.05)" d="M0,250 C360,350 720,150 1080,250 C1260,300 1380,270 1440,250 L1440,400 L0,400 Z"/>
          </svg>
        </div>
        {/* Floating Decorations */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-md">
          {/* Illustration */}
          <svg viewBox="0 0 300 220" className="w-full mb-8">
            {/* Rocket */}
            <ellipse cx="150" cy="200" rx="60" ry="15" fill="rgba(255,255,255,0.1)"/>
            
            <g transform="translate(100, 40)">
              {/* Rocket Body */}
              <path d="M50 0 C70 0 85 30 85 70 L85 120 L50 140 L15 120 L15 70 C15 30 30 0 50 0Z" fill="white"/>
              <path d="M50 10 C65 10 75 35 75 70 L75 110 L50 125 L25 110 L25 70 C25 35 35 10 50 10Z" fill="#E2E8F0"/>
              
              {/* Window */}
              <circle cx="50" cy="50" r="18" fill="#3B82F6"/>
              <circle cx="50" cy="50" r="12" fill="#60A5FA"/>
              <circle cx="45" cy="45" r="4" fill="white" opacity="0.5"/>
              
              {/* Fins */}
              <path d="M15 90 L0 120 L15 120 Z" fill="#3B82F6"/>
              <path d="M85 90 L100 120 L85 120 Z" fill="#3B82F6"/>
              
              {/* Flames */}
              <ellipse cx="50" cy="155" rx="20" ry="15" fill="#F59E0B"/>
              <ellipse cx="50" cy="150" rx="12" ry="10" fill="#FBBF24"/>
              <ellipse cx="50" cy="145" rx="6" ry="6" fill="white"/>
            </g>
            
            {/* Stars */}
            <circle cx="40" cy="40" r="3" fill="white" opacity="0.8"/>
            <circle cx="260" cy="60" r="2" fill="white" opacity="0.6"/>
            <circle cx="30" cy="150" r="2" fill="white" opacity="0.7"/>
            <circle cx="270" cy="140" r="3" fill="white" opacity="0.5"/>
            <circle cx="80" cy="80" r="2" fill="white" opacity="0.4"/>
            <circle cx="220" cy="100" r="2" fill="white" opacity="0.6"/>
          </svg>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="text-2xl font-bold">AlumniConnect</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Launch Your Career!</h2>
            <p className="text-blue-100 mb-8">
              Join thousands of alumni and students building their professional future.
            </p>
            
            <div className="space-y-3 text-left">
              {[
                "Access exclusive job opportunities",
                "Connect with industry mentors",
                "Attend networking events",
                "Build your professional brand"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
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
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join AlumniConnect to start networking</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="h-11"
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="alumni">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-500" />
                        <span>Alumni</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Create Account
                  </span>
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
