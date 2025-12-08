import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Calendar, Award, ArrowRight, CheckCircle, GraduationCap, MessageSquare, Globe, Zap, Building, TrendingUp, UserPlus, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Network Illustration */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center bg-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        {/* Floating Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Trusted by 10,000+ Alumni Worldwide</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Connect with Your 
                <span className="text-blue-400"> Alumni Network</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                Build meaningful connections, discover opportunities, and grow your career with AlumniConnect.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-6">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-white/30 text-black  h-12 px-6">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Network Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-full max-w-lg mx-auto">
                  {/* Connection Lines */}
                  <line x1="200" y1="200" x2="100" y2="100" stroke="#60A5FA" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </line>
                  <line x1="200" y1="200" x2="300" y2="100" stroke="#60A5FA" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                  </line>
                  <line x1="200" y1="200" x2="100" y2="300" stroke="#60A5FA" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </line>
                  <line x1="200" y1="200" x2="300" y2="300" stroke="#60A5FA" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1.5s"/>
                  </line>
                  <line x1="200" y1="200" x2="50" y2="200" stroke="#60A5FA" strokeWidth="2" opacity="0.6"/>
                  <line x1="200" y1="200" x2="350" y2="200" stroke="#60A5FA" strokeWidth="2" opacity="0.6"/>
                  <line x1="100" y1="100" x2="50" y2="200" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
                  <line x1="300" y1="100" x2="350" y2="200" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
                  
                  {/* Central Node - You */}
                  <circle cx="200" cy="200" r="45" fill="#3B82F6" />
                  <circle cx="200" cy="200" r="38" fill="#2563EB" />
                  <text x="200" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">YOU</text>
                  <text x="200" y="210" textAnchor="middle" fill="#93C5FD" fontSize="8">Student</text>
                  
                  {/* Alumni Node */}
                  <circle cx="100" cy="100" r="30" fill="#1E293B" stroke="#60A5FA" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="20" fill="#334155"/>
                  <text x="100" y="95" textAnchor="middle" fill="white" fontSize="8">👨‍💼</text>
                  <text x="100" y="108" textAnchor="middle" fill="#60A5FA" fontSize="8">Alumni</text>
                  
                  {/* Mentor Node */}
                  <circle cx="300" cy="100" r="30" fill="#1E293B" stroke="#22C55E" strokeWidth="2"/>
                  <circle cx="300" cy="100" r="20" fill="#334155"/>
                  <text x="300" y="95" textAnchor="middle" fill="white" fontSize="8">👨‍🏫</text>
                  <text x="300" y="108" textAnchor="middle" fill="#22C55E" fontSize="8">Mentor</text>
                  
                  {/* Student Node */}
                  <circle cx="100" cy="300" r="30" fill="#1E293B" stroke="#A855F7" strokeWidth="2"/>
                  <circle cx="100" cy="300" r="20" fill="#334155"/>
                  <text x="100" y="295" textAnchor="middle" fill="white" fontSize="8">👩‍🎓</text>
                  <text x="100" y="308" textAnchor="middle" fill="#A855F7" fontSize="8">Student</text>
                  
                  {/* Recruiter Node */}
                  <circle cx="300" cy="300" r="30" fill="#1E293B" stroke="#F59E0B" strokeWidth="2"/>
                  <circle cx="300" cy="300" r="20" fill="#334155"/>
                  <text x="300" y="295" textAnchor="middle" fill="white" fontSize="8">💼</text>
                  <text x="300" y="308" textAnchor="middle" fill="#F59E0B" fontSize="8">Recruiter</text>
                  
                  {/* Peer Nodes */}
                  <circle cx="50" cy="200" r="22" fill="#1E293B" stroke="#60A5FA" strokeWidth="2"/>
                  <text x="50" y="195" textAnchor="middle" fill="white" fontSize="7">👤</text>
                  <text x="50" y="207" textAnchor="middle" fill="#60A5FA" fontSize="7">Peer</text>
                  
                  <circle cx="350" cy="200" r="22" fill="#1E293B" stroke="#60A5FA" strokeWidth="2"/>
                  <text x="350" y="195" textAnchor="middle" fill="white" fontSize="7">👤</text>
                  <text x="350" y="207" textAnchor="middle" fill="#60A5FA" fontSize="7">Expert</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Custom Illustrations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to build connections and advance your career.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Network Card */}
            <Card className="border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <circle cx="40" cy="30" r="12" fill="#3B82F6"/>
                    <circle cx="20" cy="55" r="8" fill="#93C5FD"/>
                    <circle cx="60" cy="55" r="8" fill="#93C5FD"/>
                    <line x1="40" y1="42" x2="20" y2="47" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="40" y1="42" x2="60" y2="47" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="20" y1="55" x2="60" y2="55" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Your Network</h3>
                <p className="text-gray-600 text-sm">Connect with alumni from your institution working across industries worldwide.</p>
              </CardContent>
            </Card>

            {/* Jobs Card */}
            <Card className="border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <rect x="15" y="25" width="50" height="35" rx="4" fill="#22C55E"/>
                    <rect x="28" y="18" width="24" height="10" rx="2" fill="#86EFAC"/>
                    <rect x="22" y="35" width="15" height="10" rx="2" fill="white"/>
                    <rect x="22" y="50" width="36" height="3" rx="1" fill="white" opacity="0.7"/>
                    <rect x="22" y="55" width="24" height="3" rx="1" fill="white" opacity="0.5"/>
                    <circle cx="55" cy="38" r="8" fill="#86EFAC"/>
                    <path d="M52 38 L54 40 L58 36" stroke="#22C55E" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Opportunities</h3>
                <p className="text-gray-600 text-sm">Access exclusive job postings and internships shared by alumni.</p>
              </CardContent>
            </Card>

            {/* Events Card */}
            <Card className="border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <rect x="15" y="22" width="50" height="40" rx="4" fill="#A855F7"/>
                    <rect x="15" y="22" width="50" height="12" rx="4" fill="#C084FC"/>
                    <circle cx="25" cy="28" r="3" fill="white"/>
                    <circle cx="55" cy="28" r="3" fill="white"/>
                    <rect x="22" y="40" width="10" height="8" rx="2" fill="white"/>
                    <rect x="35" y="40" width="10" height="8" rx="2" fill="white"/>
                    <rect x="48" y="40" width="10" height="8" rx="2" fill="white"/>
                    <rect x="22" y="52" width="10" height="8" rx="2" fill="white" opacity="0.7"/>
                    <rect x="35" y="52" width="10" height="8" rx="2" fill="white" opacity="0.7"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Attend Events</h3>
                <p className="text-gray-600 text-sm">Join networking events, webinars, and meetups organized by the community.</p>
              </CardContent>
            </Card>

            {/* Mentorship Card */}
            <Card className="border-2 border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <path d="M40 15 L48 35 L70 37 L54 52 L58 74 L40 64 L22 74 L26 52 L10 37 L32 35 Z" fill="#F59E0B"/>
                    <circle cx="40" cy="42" r="12" fill="#FCD34D"/>
                    <circle cx="36" cy="40" r="2" fill="#F59E0B"/>
                    <circle cx="44" cy="40" r="2" fill="#F59E0B"/>
                    <path d="M36 46 Q40 50 44 46" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Mentorship</h3>
                <p className="text-gray-600 text-sm">Receive guidance from experienced alumni in your field of interest.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in three simple steps</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line - Only on md and above */}
              <div className="hidden md:block absolute top-16 left-[calc(16.67%+64px)] right-[calc(16.67%+64px)] h-0.5 bg-gray-200"></div>
              
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center relative">
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    <circle cx="40" cy="28" r="14" fill="#E2E8F0"/>
                    <circle cx="40" cy="28" r="12" fill="#3B82F6"/>
                    <path d="M34 27 L38 31 L46 23" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <rect x="20" y="48" width="40" height="22" rx="4" fill="#E2E8F0"/>
                    <rect x="26" y="54" width="28" height="4" rx="1" fill="#94A3B8"/>
                    <rect x="30" y="62" width="20" height="3" rx="1" fill="#94A3B8"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Create Profile</h3>
                <p className="text-gray-600">Sign up and build your professional profile with your skills and experience.</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center relative">
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    <circle cx="25" cy="35" r="12" fill="#3B82F6"/>
                    <circle cx="55" cy="35" r="12" fill="#22C55E"/>
                    <circle cx="40" cy="55" r="12" fill="#A855F7"/>
                    <line x1="34" y1="40" x2="46" y2="40" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2"/>
                    <line x1="28" y1="46" x2="36" y2="50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2"/>
                    <line x1="52" y1="46" x2="44" y2="50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Connect</h3>
                <p className="text-gray-600">Find and connect with alumni, students, and mentors in your network.</p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center relative">
                  <svg viewBox="0 0 80 80" className="w-16 h-16">
                    <rect x="15" y="28" width="50" height="35" rx="4" fill="#3B82F6"/>
                    <path d="M15 38 L40 52 L65 38" stroke="white" strokeWidth="2" fill="none"/>
                    <circle cx="55" cy="25" r="12" fill="#22C55E"/>
                    <path d="M50 25 L54 29 L60 21" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <rect x="22" y="55" width="36" height="3" rx="1" fill="white" opacity="0.5"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
                </div>
                <h3 className="font-semibold text-xl mb-2">Grow</h3>
                <p className="text-gray-600">Discover opportunities and advance your career with your network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
              </div>
              <p className="text-2xl md:text-4xl font-bold mb-1">10,000+</p>
              <p className="text-slate-400 text-xs md:text-base">Active Members</p>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-green-500/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Building className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
              </div>
              <p className="text-2xl md:text-4xl font-bold mb-1">500+</p>
              <p className="text-slate-400 text-xs md:text-base">Partner Companies</p>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-purple-500/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
              </div>
              <p className="text-2xl md:text-4xl font-bold mb-1">1,200+</p>
              <p className="text-slate-400 text-xs md:text-base">Jobs Posted</p>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-amber-500/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-amber-400" />
              </div>
              <p className="text-2xl md:text-4xl font-bold mb-1">50+</p>
              <p className="text-slate-400 text-xs md:text-base">Events Per Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join AlumniConnect?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of students and alumni who are already building meaningful connections.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Briefcase, text: "Access to exclusive job opportunities" },
                  { icon: Users, text: "Connect with 10,000+ alumni worldwide" },
                  { icon: Calendar, text: "Attend networking events and webinars" },
                  { icon: Award, text: "Get mentorship from industry experts" },
                  { icon: MessageSquare, text: "Stay updated with announcements" },
                  { icon: TrendingUp, text: "Build lasting professional relationships" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Illustration */}
            <div className="hidden lg:block">
              <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
                {/* Background */}
                <rect x="50" y="50" width="300" height="300" rx="20" fill="#F1F5F9"/>
                
                {/* Chart */}
                <rect x="80" y="280" width="40" height="50" rx="4" fill="#3B82F6"/>
                <rect x="140" y="240" width="40" height="90" rx="4" fill="#22C55E"/>
                <rect x="200" y="200" width="40" height="130" rx="4" fill="#A855F7"/>
                <rect x="260" y="160" width="40" height="170" rx="4" fill="#F59E0B"/>
                
                {/* Arrow */}
                <path d="M70 130 Q200 80 320 130" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="8 4"/>
                <polygon points="320,125 330,130 320,135" fill="#3B82F6"/>
                
                {/* Labels */}
                <text x="100" y="350" textAnchor="middle" fill="#64748B" fontSize="12">Q1</text>
                <text x="160" y="350" textAnchor="middle" fill="#64748B" fontSize="12">Q2</text>
                <text x="220" y="350" textAnchor="middle" fill="#64748B" fontSize="12">Q3</text>
                <text x="280" y="350" textAnchor="middle" fill="#64748B" fontSize="12">Q4</text>
                
                {/* Badge */}
                <circle cx="320" cy="100" r="30" fill="#22C55E"/>
                <text x="320" y="95" textAnchor="middle" fill="white" fontSize="10">Career</text>
                <text x="320" y="108" textAnchor="middle" fill="white" fontSize="10">Growth</text>
                
                <text x="200" y="380" textAnchor="middle" fill="#1E293B" fontSize="14" fontWeight="bold">Your Career Progress</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Wave Decoration */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.1)" d="M0,100 C360,200 720,0 1080,100 C1260,150 1380,120 1440,100 L1440,200 L0,200 Z"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
              Join thousands of alumni and students building their professional network today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 h-12 px-8 w-full sm:w-auto">
                  Create Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-blue-700 hover:bg-blue-50 h-12 px-8 w-full sm:w-auto">
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="text-white font-bold text-lg">AlumniConnect</span>
              </div>
              <p className="text-sm">Building bridges between generations of graduates.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
                <li><Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/announcements" className="hover:text-white transition-colors">Announcements</Link></li>
                <li><Link href="/connections" className="hover:text-white transition-colors">Network</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
