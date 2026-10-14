import { useMemo, useState } from 'react'
import { ArrowLeft, Heart, MapPin, Search, SlidersHorizontal, UserRound } from 'lucide-react'
import type { Caregiver } from '../types/caregiver'
import './FindCaregiverPage.css'

export default function FindCaregiverPage({
  caregivers,
  onBack,
  onOpenProfile,
  onOpenRequests,
  onViewCaregiver,
}: {
  caregivers: Caregiver[]
  onBack: () => void
  onOpenProfile: () => void
  onOpenRequests: () => void
  onViewCaregiver: (caregiverId: string) => void
}) {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('all')
  const [careType, setCareType] = useState('all')

  const locations = useMemo(() => [...new Set(caregivers.map((caregiver) => caregiver.location))], [caregivers])
  const careTypes = useMemo(() => [...new Set(caregivers.flatMap((caregiver) => caregiver.services))].sort(), [caregivers])
  const filteredCaregivers = caregivers.filter((caregiver) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query
      || caregiver.name.toLowerCase().includes(query)
      || caregiver.title.toLowerCase().includes(query)
      || caregiver.services.some((service) => service.toLowerCase().includes(query))
    const matchesLocation = location === 'all' || caregiver.location === location
    const matchesCareType = careType === 'all' || caregiver.services.includes(careType)
    return matchesSearch && matchesLocation && matchesCareType
  })
  const filtersActive = Boolean(search.trim()) || location !== 'all' || careType !== 'all'

  function clearFilters() {
    setSearch('')
    setLocation('all')
    setCareType('all')
  }

  return (
    <main className="mother-dashboard find-care-page">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-inner">
          <button className="dashboard-brand dashboard-brand-button" type="button" onClick={onBack} aria-label="Back to overview">
            <span className="dashboard-brand-mark"><Heart size={18} fill="currentColor" /></span>
            <span><strong>Tetarasa</strong><small>Maternal care, together</small></span>
          </button>
          <nav className="dashboard-nav" aria-label="Dashboard navigation">
            <button type="button" onClick={onBack}>Overview</button>
            <button className="is-active" type="button" aria-current="page">Find Care</button>
            <button type="button" onClick={onOpenRequests}>My Requests</button>
          </nav>
          <div className="dashboard-account">
            <button className="dashboard-profile-button" type="button" aria-label="Open my profile" onClick={onOpenProfile}><span className="dashboard-avatar"><UserRound size={17} /></span><span className="dashboard-profile-label">My Profile</span></button>
          </div>
        </div>
      </header>

      <div className="dashboard-content find-care-content">
        <button className="find-care-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Back to overview</button>
        <section className="find-care-heading">
          <span className="dashboard-eyebrow">A LITTLE SUPPORT GOES A LONG WAY</span>
          <h1>Find a caregiver</h1>
          <p>Explore postnatal caregivers and find the support that feels right for you.</p>
        </section>

        <section className="caregiver-search-panel" aria-label="Search and filter caregivers">
          <label className="caregiver-search-input"><Search size={19} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search names or services" aria-label="Search caregiver names or services" /></label>
          <div className="caregiver-filter-group"><SlidersHorizontal size={17} /><span>Filter by</span>
            <label><span className="visually-hidden">Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">All locations</option>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label><span className="visually-hidden">Type of care</span><select value={careType} onChange={(event) => setCareType(event.target.value)}><option value="all">All care types</option>{careTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
        </section>

        <div className="caregiver-results-heading"><p>{filteredCaregivers.length} {filteredCaregivers.length === 1 ? 'caregiver' : 'caregivers'} to explore</p>{filtersActive && <button type="button" onClick={clearFilters}>Clear filters</button>}</div>

        {filteredCaregivers.length ? (
          <section className="find-caregiver-grid" aria-label="Caregiver results">
            {filteredCaregivers.map((caregiver) => (
              <article className="find-caregiver-card" key={caregiver.id}>
                <div className="find-caregiver-card-top">
                  <span className="find-caregiver-avatar" role="img" aria-label={`Photo placeholder for ${caregiver.name}`}>{caregiver.initials}</span>
                  <span className="find-caregiver-rating">Rating {caregiver.rating}</span>
                </div>
                <h2>{caregiver.name}</h2>
                <p className="find-caregiver-title">{caregiver.title}</p>
                <div className="find-caregiver-facts"><span>{caregiver.experienceYears} years of experience</span><span><MapPin size={14} />{caregiver.location}</span></div>
                <div className="find-caregiver-services" aria-label="Care services">{caregiver.services.slice(0, 3).map((service) => <span key={service}>{service}</span>)}</div>
                <button className="find-caregiver-view-button" type="button" onClick={() => onViewCaregiver(caregiver.id)}>View Profile</button>
              </article>
            ))}
          </section>
        ) : (
          <section className="find-care-empty" aria-live="polite"><span><Search size={21} /></span><h2>No caregivers match those filters</h2><p>Try another name, location, or type of care.</p><button type="button" onClick={clearFilters}>Clear filters</button></section>
        )}

        <p className="find-care-demo-note">Caregiver profiles are sample data for this demo. Search and filters run in this page only.</p>
      </div>
    </main>
  )
}
