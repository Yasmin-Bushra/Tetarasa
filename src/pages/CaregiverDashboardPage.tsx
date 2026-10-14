import { CalendarDays, Heart, MapPin, ShieldCheck, Users } from 'lucide-react'
import './CaregiverDashboardPage.css'

export default function CaregiverDashboardPage({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const name = email.toLowerCase() === 'caregiver@tetarasa.com'
    ? 'Sara Bekele'
    : email.split('@')[0]?.replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Caregiver'

  return (
    <main className="caregiver-dashboard">
      <header className="caregiver-dashboard-header">
        <a className="caregiver-dashboard-brand" href="#caregiver-home"><span><Heart size={18} fill="currentColor" /></span><strong>Tetarasa</strong></a>
        <button type="button" onClick={onSignOut}>Sign out</button>
      </header>
      <div className="caregiver-dashboard-content" id="caregiver-home">
        <span className="caregiver-dashboard-eyebrow"><ShieldCheck size={15} /> CAREGIVER SPACE</span>
        <h1>Welcome, {name}</h1>
        <p className="caregiver-dashboard-intro">Your caregiver demo account is ready. This is your space to support mothers and families.</p>
        <div className="caregiver-dashboard-grid">
          <article><span className="caregiver-dashboard-icon"><CalendarDays size={19} /></span><small>YOUR SCHEDULE</small><h2>Appointments</h2><p>Your upcoming visits will appear here.</p></article>
          <article><span className="caregiver-dashboard-icon caregiver-dashboard-icon--peach"><Users size={19} /></span><small>FAMILY CONNECTIONS</small><h2>Care requests</h2><p>New mother requests will appear here.</p></article>
          <article><span className="caregiver-dashboard-icon caregiver-dashboard-icon--lavender"><MapPin size={19} /></span><small>YOUR PROFILE</small><h2>Care area</h2><p>Set your service area in your caregiver profile.</p></article>
        </div>
        <aside className="caregiver-demo-note">You’re signed in with mock data. Connect a caregiver account service to load real appointments and requests.</aside>
      </div>
    </main>
  )
}
