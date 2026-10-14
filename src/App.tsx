import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './App.css'
import CaregiverSignUpPage from './pages/CaregiverSignUpPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MotherSignUpPage from './pages/MotherSignUpPage'
import MotherDashboardPage from './pages/MotherDashboardPage'
import CaregiverDashboardPage from './pages/CaregiverDashboardPage'
import MotherProfilePage from './pages/MotherProfilePage'
import FindCaregiverPage from './pages/FindCaregiverPage'
import CaregiverProfilePage from './pages/CaregiverProfilePage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import { createMotherProfile, type MotherProfile } from './types/mother'
import { mockCaregivers } from './data/mockCaregivers'
import type { CareRequest } from './types/caregiver'

type View = 'landing' | 'role-selection' | 'signup' | 'login' | 'mother-dashboard' | 'mother-profile' | 'find-caregiver' | 'caregiver-profile' | 'caregiver-dashboard'

function viewToUrl(view: View) {
  return view === 'landing' ? `${window.location.pathname}${window.location.search}` : `#/${view}`
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(target.closest('button, a, input, textarea, select, label'))
}

function App() {
  const [history, setHistory] = useState<View[]>(['landing'])
  const [selectedRole, setSelectedRole] = useState<'mother' | 'caregiver' | null>(null)
  const [caregiverEmail, setCaregiverEmail] = useState('')
  const [motherProfile, setMotherProfile] = useState<MotherProfile>(() => createMotherProfile('Mother'))
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null)
  const [careRequests, setCareRequests] = useState<CareRequest[]>([])
  const swipeStartX = useRef<number | null>(null)
  const swipeStartY = useRef<number | null>(null)

  const currentView = history[history.length - 1]

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '', viewToUrl('landing'))

    const handlePopState = () => {
      setHistory((previous) => {
        if (previous.length <= 1) {
          return previous
        }

        const leaving = previous[previous.length - 1]
        if (leaving === 'login') {
          setSelectedRole(null)
        }

        return previous.slice(0, -1)
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const goTo = (nextView: View) => {
    if (currentView === nextView) {
      return
    }

    window.history.pushState({ view: nextView }, '', viewToUrl(nextView))
    setHistory((previous) => [...previous, nextView])
  }

  const goToRoleSelection = () => {
    setSelectedRole(null)
    goTo('role-selection')
  }

  const goToSignup = (role: 'mother' | 'caregiver' | null = null) => {
    setSelectedRole(role)
    goTo('signup')
  }

  const goToLogin = (role: 'mother' | 'caregiver' | null = null) => {
    setSelectedRole(role)
    goTo('login')
  }

  const goBack = () => {
    if (history.length <= 1) {
      return
    }

    window.history.back()
  }

  const addCareRequest = (caregiverId: string) => {
    const caregiver = mockCaregivers.find((item) => item.id === caregiverId)
    if (!caregiver) return

    setCareRequests((current) => current.some((request) => request.caregiverId === caregiverId)
      ? current
      : [{
          caregiverId: caregiver.id,
          caregiverName: caregiver.name,
          initials: caregiver.initials,
          service: caregiver.title,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        }, ...current])
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(event.target)) {
      swipeStartX.current = null
      swipeStartY.current = null
      return
    }

    swipeStartX.current = event.clientX
    swipeStartY.current = event.clientY
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null || swipeStartY.current === null) {
      return
    }

    const deltaX = event.clientX - swipeStartX.current
    const deltaY = event.clientY - swipeStartY.current

    if (deltaX > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goBack()
    }

    swipeStartX.current = null
    swipeStartY.current = null
  }

  const content = (() => {
    if (currentView === 'landing') {
      return <LandingPage onGetStarted={goToRoleSelection} />
    }

    if (currentView === 'role-selection') {
      return (
        <RoleSelectionPage
          onBack={goBack}
          onSignIn={() => goToLogin()}
          onSelectRole={(role) => goToSignup(role)}
        />
      )
    }

    if (currentView === 'signup') {
      if (selectedRole === 'mother') {
        return (
          <MotherSignUpPage
            onBack={goBack}
            onSignIn={() => goToLogin(selectedRole)}
            onCreateAccount={(data) => {
              console.log('Mother sign-up data:', data)
              goToLogin(selectedRole)
            }}
          />
        )
      }

      return (
        <CaregiverSignUpPage
          onBack={goBack}
          selectedRole={selectedRole}
          onCreateAccount={() => goToLogin(selectedRole)}
          onHaveAccount={() => goToLogin(selectedRole)}
        />
      )
    }

    if (currentView === 'mother-dashboard') {
      return <MotherDashboardPage profile={motherProfile} requests={careRequests} onFindCare={() => goTo('find-caregiver')} onOpenProfile={() => goTo('mother-profile')} onSignOut={() => goToLogin('mother')} />
    }

    if (currentView === 'mother-profile') {
      return <MotherProfilePage profile={motherProfile} onBack={goBack} onSave={setMotherProfile} />
    }

    if (currentView === 'find-caregiver') {
      return (
        <FindCaregiverPage
          caregivers={mockCaregivers}
          onBack={goBack}
          onOpenProfile={() => goTo('mother-profile')}
          onOpenRequests={() => {
            goTo('mother-dashboard')
            window.setTimeout(() => document.getElementById('requests')?.scrollIntoView({ behavior: 'smooth' }), 80)
          }}
          onViewCaregiver={(caregiverId) => {
            setSelectedCaregiverId(caregiverId)
            goTo('caregiver-profile')
          }}
        />
      )
    }

    if (currentView === 'caregiver-profile') {
      const caregiver = mockCaregivers.find((item) => item.id === selectedCaregiverId)
      if (caregiver) {
        return (
          <CaregiverProfilePage
            caregiver={caregiver}
            requested={careRequests.some((request) => request.caregiverId === caregiver.id)}
            onBack={goBack}
            onOpenProfile={() => goTo('mother-profile')}
            onOpenRequests={() => {
              goTo('mother-dashboard')
              window.setTimeout(() => document.getElementById('requests')?.scrollIntoView({ behavior: 'smooth' }), 80)
            }}
            onRequestCare={() => addCareRequest(caregiver.id)}
          />
        )
      }

      return <MotherDashboardPage profile={motherProfile} requests={careRequests} onFindCare={() => goTo('find-caregiver')} onOpenProfile={() => goTo('mother-profile')} onSignOut={() => goToLogin('mother')} />
    }

    if (currentView === 'caregiver-dashboard') {
      return <CaregiverDashboardPage email={caregiverEmail} onSignOut={() => goToLogin('caregiver')} />
    }

    return (
      <LoginPage
        onBack={goBack}
        selectedRole={selectedRole}
        onCreateAccount={(role) => goToSignup(role ?? selectedRole ?? 'mother')}
        onRoleSelected={setSelectedRole}
        onSignIn={(email, role) => {
          if (role === 'mother') {
            const name = email.toLowerCase() === 'mother@tetarasa.com'
              ? 'Mekdes Alemu'
              : email.split('@')[0]?.replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Mother'
            setMotherProfile((profile) => ({ ...profile, name }))
            goTo('mother-dashboard')
          } else {
            setCaregiverEmail(email)
            goTo('caregiver-dashboard')
          }
        }}
      />
    )
  })()

  return (
    <div
      className="app-shell"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {content}
    </div>
  )
}

export default App
