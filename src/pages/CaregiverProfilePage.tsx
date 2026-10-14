import { ArrowLeft, Check, Clock3, Heart, MapPin, ShieldCheck } from 'lucide-react'
import type { Caregiver } from '../types/caregiver'
import './CaregiverProfilePage.css'

export default function CaregiverProfilePage({
  caregiver,
  requested,
  onBack,
  onOpenProfile,
  onOpenRequests,
  onRequestCare,
}: {
  caregiver: Caregiver
  requested: boolean
  onBack: () => void
  onOpenProfile: () => void
  onOpenRequests: () => void
  onRequestCare: () => void
}) {
  return (
    <main className="mother-dashboard caregiver-profile-page">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-inner">
          <button className="dashboard-brand dashboard-brand-button" type="button" onClick={onBack} aria-label="Back to caregiver search">
            <span className="dashboard-brand-mark"><Heart size={18} fill="currentColor" /></span>
            <span><strong>Tetarasa</strong><small>Maternal care, together</small></span>
          </button>
          <nav className="dashboard-nav" aria-label="Dashboard navigation">
            <button type="button" onClick={onBack}>Find Care</button>
            <button className="is-active" type="button" aria-current="page">Caregiver Profile</button>
            <button type="button" onClick={onOpenRequests}>My Requests</button>
          </nav>
          <div className="dashboard-account"><button className="dashboard-profile-button" type="button" aria-label="Open my profile" onClick={onOpenProfile}><span className="dashboard-avatar">M</span><span className="dashboard-profile-label">My Profile</span></button></div>
        </div>
      </header>

      <div className="dashboard-content caregiver-profile-content">
        <button className="find-care-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Back to caregivers</button>
        <section className="caregiver-profile-card">
          <div className="caregiver-profile-hero">
            <span className="caregiver-profile-avatar" role="img" aria-label={`Photo placeholder for ${caregiver.name}`}>{caregiver.initials}</span>
            <div className="caregiver-profile-heading">
              <span className="dashboard-eyebrow">CAREGIVER PROFILE</span>
              <h1>{caregiver.name}</h1>
              <p>{caregiver.title}</p>
              <div className="caregiver-profile-location"><MapPin size={15} />{caregiver.location}</div>
            </div>
            <span className="caregiver-profile-rating">Rating {caregiver.rating}</span>
          </div>

          <div className="caregiver-profile-body">
            <div className="caregiver-profile-main">
              <section><h2>About</h2><p>{caregiver.bio}</p></section>
              <section><h2>Care services</h2><div className="caregiver-profile-services">{caregiver.services.map((service) => <span key={service}>{service}</span>)}</div></section>
              <section className="caregiver-profile-facts">
                <div><ShieldCheck size={17} /><span><small>Experience</small><strong>{caregiver.experienceYears} years supporting families</strong></span></div>
                <div><Heart size={17} /><span><small>Languages</small><strong>{caregiver.languages.join(', ')}</strong></span></div>
                <div><Clock3 size={17} /><span><small>Availability</small><strong>{caregiver.availability}</strong></span></div>
              </section>
            </div>
            <aside className="caregiver-request-panel">
              <span className="dashboard-eyebrow">NEXT STEP</span>
              <h2>Interested in care with {caregiver.name.split(' ')[0]}?</h2>
              <p>Send a request to start a conversation about the support you need.</p>
              <button className={requested ? 'dashboard-primary-button caregiver-request-submit is-requested' : 'dashboard-primary-button caregiver-request-submit'} type="button" onClick={onRequestCare} disabled={requested}>
                {requested ? <><Check size={17} /> Request added</> : <>Request Care</>}
              </button>
              <p className="caregiver-request-disclaimer">Demo only: this request is stored for this session and is not sent to a caregiver.</p>
            </aside>
          </div>
        </section>
        <p className="find-care-demo-note">This caregiver profile uses sample data.</p>
      </div>
    </main>
  )
}
