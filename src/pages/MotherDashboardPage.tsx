import {
  CalendarDays,
  Heart,
  Search,
} from 'lucide-react'
import type { MotherProfile } from '../types/mother'
import type { CareRequest } from '../types/caregiver'
import './MotherDashboardPage.css'

export default function MotherDashboardPage({
  profile,
  requests,
  onOpenProfile,
  onFindCare,
  onSignOut,
}: {
  profile: MotherProfile
  requests: CareRequest[]
  onOpenProfile: () => void
  onFindCare: () => void
  onSignOut: () => void
}) {
  return (
    <main className="mother-dashboard">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-inner">
          <a className="dashboard-brand" href="#overview" aria-label="Tetarasa overview">
            <span className="dashboard-brand-mark"><Heart size={18} fill="currentColor" /></span>
            <span><strong>Tetarasa</strong><small>Maternal care, together</small></span>
          </a>
          <nav className="dashboard-nav" aria-label="Dashboard navigation">
            <a className="is-active" href="#overview">Overview</a>
            <button type="button" onClick={onFindCare}>Find Care</button>
            <a href="#requests">My Requests{requests.length > 0 && <span className="dashboard-nav-count">{requests.length}</span>}</a>
          </nav>
          <div className="dashboard-account">
            <button className="dashboard-profile-button" type="button" aria-label="Open my profile" onClick={onOpenProfile}>
              <span className="dashboard-avatar">{profile.name.slice(0, 1).toUpperCase()}</span>
              <span className="dashboard-profile-label">My Profile</span>
            </button>
            <button className="dashboard-signout" type="button" onClick={onSignOut}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content" id="overview">
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">YOUR CARE SPACE</span>
            <h1>Welcome, {profile.name.split(' ')[0]}</h1>
            <p>Here when you need us, at your own pace.</p>
          </div>
          <button className="dashboard-primary-button" type="button" onClick={onFindCare}><Search size={17} /> Find a Caregiver</button>
        </section>

        <div className="dashboard-overview-grid">
          <section className="dashboard-panel" aria-labelledby="appointments-heading">
            <div className="dashboard-panel-heading">
              <div><span className="dashboard-eyebrow">YOUR SCHEDULE</span><h2 id="appointments-heading">Upcoming appointment</h2></div>
            </div>
            <div className="dashboard-empty-state">
              <span className="dashboard-empty-icon"><CalendarDays size={20} /></span>
              <div><h3>No appointments yet</h3><p>Your scheduled visits will appear here.</p></div>
            </div>
          </section>

          <section className="dashboard-panel" id="requests" aria-labelledby="requests-heading">
            <div className="dashboard-panel-heading">
              <div><span className="dashboard-eyebrow">CARE CONNECTIONS</span><h2 id="requests-heading">Recent requests</h2></div>
              {requests.length > 0 && <span className="request-count">{requests.length}</span>}
            </div>
            {requests.length === 0 ? (
              <div className="dashboard-request-empty"><p>No care requests yet.</p><button type="button" onClick={onFindCare}>Explore caregivers</button></div>
            ) : (
              <div className="dashboard-request-list">
                {requests.slice(0, 3).map((request) => (
                  <article className="request-row" key={request.caregiverId}>
                    <span className="request-avatar">{request.initials}</span>
                    <div className="request-copy"><strong>{request.caregiverName}</strong><small>{request.service}</small></div>
                    <span className={`status-pill ${request.status === 'Accepted' ? 'status-accepted' : 'status-pending'}`}>{request.status}</span>
                  </article>
                ))}
                <p className="demo-data-note">Demo requests stay in this session only.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
