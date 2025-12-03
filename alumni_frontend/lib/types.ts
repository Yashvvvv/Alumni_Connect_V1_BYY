// =======================================
// ROLES
// =======================================
export type UserRole = "student" | "alumni" | "admin"

// =======================================
// USER
// =======================================
export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

// =======================================
// AUTH
// =======================================
export interface AuthResponse {
  _id: string
  name: string
  email: string
  role: UserRole
  token: string
}

// =======================================
// PROFILE
// =======================================
export interface Profile {
  _id: string
  user: User
  headline?: string
  bio?: string
  location?: string
  skills: string[]
  profileImage?: string
  links?: {
    linkedin?: string
    github?: string
    portfolio?: string
  }
  // Alumni fields
  currentRole?: string
  company?: string
  yearsOfExperience?: number
  industry?: string
  batch?: string
  mentorShipInterest?: boolean
  // Student fields
  currentCourse?: string
  yearOfStudy?: number
  interest?: string[]
  createdAt: string
  updatedAt: string
}

// ---- API Responses ----
export interface ProfileResponse {
  success?: boolean
  profile: Profile
}

export interface ProfileListResponse {
  success?: boolean
  profiles: Profile[]
}

// =======================================
// JOB
// =======================================
export interface Job {
  _id: string
  title: string
  company: string
  description: string
  skillsRequired: string[]
  location?: string
  type: string
  
  postedBy: {
    _id: string
    name: string
    email: string
    role: UserRole
  }

  applicants: {
    _id: string
    name: string
    email: string
    role: UserRole
  }[]

  approved: boolean
  createdAt: string
  updatedAt: string
}


// ---- API Responses ----
export interface JobsListResponse {
  success?: boolean
  jobs: Job[]
}

export interface JobDetailResponse {
  success?: boolean
  job: Job
}

export interface CreateJobResponse {
  success?: boolean
  message: string
  job: Job
}

export interface ApplyJobResponse {
  success?: boolean
  message: string
}

export interface MyPostedJobsResponse {
  success?: boolean
  jobs: Job[]
}

// =======================================
// EVENTS
// =======================================
export interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  createdBy: User
  creatorRole: UserRole
  registeredUsers: string[]
  status: "upcoming" | "ongoing" | "completed"
  bannerImage?: string
  createdAt: string
  updatedAt: string
}

// ---- API Responses ----
export interface EventsListResponse {
  success?: boolean
  events: Event[]
}

export interface EventDetailResponse {
  success?: boolean
  event: Event
}

// =======================================
// CONNECTIONS
// =======================================
export interface Connection {
  _id: string
  requester: User
  recipient: User
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  updatedAt: string
}

// =======================================
// ANNOUNCEMENTS
// =======================================
export interface Announcement {
  _id: string
  title: string
  message: string
  createdBy: User
  creatorRole: UserRole
  attachment?: string
  createdAt: string
  updatedAt: string
}

export interface AnnouncementListResponse {
  success?: boolean
  announcements: Announcement[]
}

// =======================================
// DASHBOARD
// =======================================
export interface StudentDashboard {
  appliedJobs: number
  connections: number
  upcomingEvents: number
}

export interface AlumniDashboard {
  jobsPosted: number
  eventsCreated: number
  connections: number
}

export interface AdminDashboard {
  totalUsers: number
  totalJobs: number
  totalEvents: number
  students: number
  alumni: number
}

export interface DashboardResponse {
  success?: boolean
  stats: StudentDashboard | AlumniDashboard | AdminDashboard
}
