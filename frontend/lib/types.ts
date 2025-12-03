export type UserRole = "student" | "alumni" | "admin"

export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  _id: string
  name: string
  email: string
  role: UserRole
  token: string
}

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

export interface Job {
  _id: string
  title: string
  company: string
  description: string
  skillsRequired: string[]
  location?: string
  type: "Full-time" | "Part-time" | "Internship" | "Remote"
  postedBy: User
  applicants: string[]
  approved: boolean
  createdAt: string
  updatedAt: string
}

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

export interface Connection {
  _id: string
  requester: User
  recipient: User
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  updatedAt: string
}

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
