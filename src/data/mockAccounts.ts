export type MockAccountRole = 'mother' | 'caregiver'

export interface MockAccount {
  email: string
  password: string
  role: MockAccountRole
  name: string
}

export const mockAccounts: MockAccount[] = [
  {
    email: 'mother@tetarasa.com',
    password: 'Mother123!',
    role: 'mother',
    name: 'Mekdes Alemu',
  },
  {
    email: 'caregiver@tetarasa.com',
    password: 'Caregiver123!',
    role: 'caregiver',
    name: 'Sara Bekele',
  },
]
