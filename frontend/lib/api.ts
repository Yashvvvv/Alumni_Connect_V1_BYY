const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "API Error")
  }

  return res.json()
}

// Auth
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    fetchAPI("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    fetchAPI("/auth/login", { method: "POST", body: JSON.stringify(data) }),
}

// User
export const userAPI = {
  getMe: () => fetchAPI("/users/me"),
}

// Profile
export const profileAPI = {
  createOrUpdate: (data: Record<string, unknown>) =>
    fetchAPI("/profile", { method: "POST", body: JSON.stringify(data) }),
  getMyProfile: () => fetchAPI("/profile/me"),
  getByUserId: (id: string) => fetchAPI(`/profile/user/${id}`),
  search: (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString()
    return fetchAPI(`/profile/search?${query}`)
  },
}

// Jobs
export const jobAPI = {
  create: (data: Record<string, unknown>) => fetchAPI("/jobs", { method: "POST", body: JSON.stringify(data) }),
  getAll: () => fetchAPI("/jobs"),
  getById: (id: string) => fetchAPI(`/jobs/${id}`),
  apply: (id: string) => fetchAPI(`/jobs/${id}/apply`, { method: "POST" }),
  getMyPosted: () => fetchAPI("/jobs/me/posted"),
}

// Events
export const eventAPI = {
  create: (data: Record<string, unknown>) => fetchAPI("/events", { method: "POST", body: JSON.stringify(data) }),
  getAll: () => fetchAPI("/events"),
  getById: (id: string) => fetchAPI(`/events/${id}`),
  update: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/events/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/events/${id}`, { method: "DELETE" }),
  register: (id: string) => fetchAPI(`/events/${id}/register`, { method: "POST" }),
  getParticipants: (id: string) => fetchAPI(`/events/${id}/participants`),
}

// Connections
export const connectionAPI = {
  send: (recipientId: string) =>
    fetchAPI("/connections/send", { method: "POST", body: JSON.stringify({ recipientId }) }),
  accept: (id: string) => fetchAPI(`/connections/${id}/accept`, { method: "PUT" }),
  reject: (id: string) => fetchAPI(`/connections/${id}/reject`, { method: "PUT" }),
  getAll: () => fetchAPI("/connections"),
  getPending: () => fetchAPI("/connections/pending"),
}

// Announcements
export const announcementAPI = {
  create: (data: Record<string, unknown>) => fetchAPI("/announcements", { method: "POST", body: JSON.stringify(data) }),
  getAll: () => fetchAPI("/announcements"),
  getById: (id: string) => fetchAPI(`/announcements/${id}`),
  delete: (id: string) => fetchAPI(`/announcements/${id}`, { method: "DELETE" }),
}

// Dashboard
export const dashboardAPI = {
  getStudent: () => fetchAPI("/dashboard/student"),
  getAlumni: () => fetchAPI("/dashboard/alumni"),
  getAdmin: () => fetchAPI("/dashboard/admin"),
}
