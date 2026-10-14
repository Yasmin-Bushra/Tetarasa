import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, CalendarDays, Heart, MapPin, Pencil, Phone, UserRound } from 'lucide-react'
import { CARE_NEEDS, type MotherProfile } from '../types/mother'
import './MotherDashboardPage.css'
import './MotherProfilePage.css'

export default function MotherProfilePage({
  profile,
  onBack,
  onSave,
}: {
  profile: MotherProfile
  onBack: () => void
  onSave: (profile: MotherProfile) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(draft)
    setEditing(false)
    setSaved(true)
  }

  return (
    <main className="mother-dashboard mother-profile-page">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-inner">
          <a className="dashboard-brand" href="#overview" onClick={(event) => { event.preventDefault(); onBack() }} aria-label="Back to overview">
            <span className="dashboard-brand-mark"><Heart size={18} fill="currentColor" /></span>
            <span><strong>Tetarasa</strong><small>Maternal care, together</small></span>
          </a>
          <button className="dashboard-back-button" type="button" onClick={onBack}><ArrowLeft size={16} /> Back to overview</button>
        </div>
      </header>

      <div className="dashboard-content profile-page-content">
        <div className="profile-page-title">
          <div><span className="dashboard-eyebrow">YOUR CARE SPACE</span><h1>My Profile</h1><p>Keep your details up to date so caregivers can support you well.</p></div>
          {!editing && <button type="button" className="dashboard-primary-button" onClick={() => { setDraft(profile); setEditing(true); setSaved(false) }}><Pencil size={16} /> Edit profile</button>}
        </div>
        {saved && <p className="profile-saved-note" role="status">Profile updated in this demo session.</p>}

        {editing ? (
          <section className="dashboard-panel profile-page-card" aria-labelledby="edit-profile-heading">
            <div className="dashboard-panel-heading"><div><span className="dashboard-eyebrow">PERSONAL DETAILS</span><h2 id="edit-profile-heading">Edit your information</h2></div></div>
            <form className="profile-page-form" onSubmit={saveProfile}>
              <div className="profile-form-grid">
                <label>Full name<input required autoComplete="name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
                <label>Phone number<input required type="tel" autoComplete="tel" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="Add your phone number" /></label>
                <label>City or subcity<input required value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} placeholder="e.g. Bole, Addis Ababa" /></label>
                <label>Pregnancy or postpartum stage<select required value={draft.stage} onChange={(event) => setDraft({ ...draft, stage: event.target.value })}><option value="">Choose your stage</option><option>Expecting</option><option>0-6 weeks postpartum</option><option>6-12 weeks postpartum</option><option>3-6 months postpartum</option><option>More than 6 months postpartum</option></select></label>
                <label>{draft.stage === 'Expecting' ? 'Expected due date' : 'Baby birth date'}<input required type="date" value={draft.careDate} onChange={(event) => setDraft({ ...draft, careDate: event.target.value })} /></label>
                <label>Preferred way to contact you<select value={draft.preferredContact} onChange={(event) => setDraft({ ...draft, preferredContact: event.target.value })}><option>Phone call</option><option>SMS</option><option>WhatsApp</option></select></label>
              </div>
              <fieldset className="profile-care-fieldset"><legend>What support would be helpful? <span>Select all that apply</span></legend><div className="profile-care-choices">{CARE_NEEDS.map((need) => <label key={need}><input type="checkbox" checked={draft.careNeeds.includes(need)} onChange={() => setDraft((current) => ({ ...current, careNeeds: current.careNeeds.includes(need) ? current.careNeeds.filter((item) => item !== need) : [...current.careNeeds, need] }))} /><span>{need}</span></label>)}</div></fieldset>
              <details className="profile-optional-details"><summary>Optional caregiver details</summary><div className="profile-form-grid profile-optional-grid"><label>Emergency contact name<input value={draft.emergencyName} onChange={(event) => setDraft({ ...draft, emergencyName: event.target.value })} placeholder="Name" /></label><label>Emergency contact phone<input type="tel" value={draft.emergencyPhone} onChange={(event) => setDraft({ ...draft, emergencyPhone: event.target.value })} placeholder="Phone number" /></label><label className="profile-notes-field">Anything else your caregiver should know?<textarea value={draft.careNotes} onChange={(event) => setDraft({ ...draft, careNotes: event.target.value })} placeholder="For example, preferred visit times or care preferences" rows={3} /></label></div></details>
              <div className="profile-modal-actions"><button type="button" className="profile-cancel-button" onClick={() => { setDraft(profile); setEditing(false) }}>Cancel</button><button type="submit" className="dashboard-primary-button">Save profile</button></div>
            </form>
          </section>
        ) : (
          <section className="dashboard-panel profile-page-card" aria-label="Profile details">
            <div className="profile-view-heading"><span className="profile-large-avatar">{profile.name.slice(0, 1).toUpperCase()}</span><div><h2>{profile.name}</h2><p>Your personal information</p></div></div>
            <div className="profile-view-grid">
              <ProfileItem icon={<Phone size={17} />} label="Phone number" value={profile.phone} />
              <ProfileItem icon={<MapPin size={17} />} label="City or subcity" value={profile.location} />
              <ProfileItem icon={<Heart size={17} />} label="Pregnancy or postpartum stage" value={profile.stage} />
              <ProfileItem icon={<CalendarDays size={17} />} label={profile.stage === 'Expecting' ? 'Expected due date' : 'Baby birth date'} value={profile.careDate ? new Date(`${profile.careDate}T00:00:00`).toLocaleDateString() : ''} />
              <ProfileItem icon={<UserRound size={17} />} label="Preferred contact" value={profile.preferredContact} />
              <ProfileItem icon={<Heart size={17} />} label="Support needs" value={profile.careNeeds.join(', ')} />
              {profile.emergencyName && <ProfileItem icon={<Phone size={17} />} label="Emergency contact" value={[profile.emergencyName, profile.emergencyPhone].filter(Boolean).join(' · ')} />}
              {profile.careNotes && <ProfileItem icon={<Heart size={17} />} label="Care notes" value={profile.careNotes} />}
            </div>
            <p className="demo-data-note profile-local-note">Changes are saved in this demo session only.</p>
          </section>
        )}
      </div>
    </main>
  )
}

function ProfileItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="profile-view-item"><span className="profile-view-icon">{icon}</span><span><small>{label}</small><strong>{value || 'Not added yet'}</strong></span></div>
}
