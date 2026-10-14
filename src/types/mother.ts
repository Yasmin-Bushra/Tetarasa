export interface MotherProfile {
  name: string
  location: string
  stage: string
  phone: string
  careDate: string
  careNeeds: string[]
  preferredContact: string
  emergencyName: string
  emergencyPhone: string
  careNotes: string
}

export const CARE_NEEDS = [
  'Newborn care',
  'Postpartum recovery',
  'Breastfeeding support',
  'Emotional wellbeing',
  'Meals and rest',
  'Overnight support',
]

export function createMotherProfile(name: string): MotherProfile {
  return {
    name,
    location: '',
    stage: '',
    phone: '',
    careDate: '',
    careNeeds: [],
    preferredContact: 'Phone call',
    emergencyName: '',
    emergencyPhone: '',
    careNotes: '',
  }
}
