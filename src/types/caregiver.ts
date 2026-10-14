export interface Caregiver {
  id: string
  name: string
  title: string
  services: string[]
  experienceYears: number
  location: string
  initials: string
  rating: string
  bio: string
  languages: string[]
  availability: string
}

export interface CareRequest {
  caregiverId: string
  caregiverName: string
  initials: string
  service: string
  status: 'Pending' | 'Accepted'
  createdAt: string
}
