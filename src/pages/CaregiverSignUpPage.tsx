import { useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import './MotherSignUpPage.css'

export default function CaregiverSignUpPage({
  onBack,
  onCreateAccount,
  onHaveAccount,
  selectedRole,
}: {
  onBack: () => void
  onCreateAccount: () => void
  onHaveAccount: () => void
  selectedRole?: 'mother' | 'caregiver' | null
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('Certified Postpartum Doula')
  const [selectedExperience, setSelectedExperience] = useState('3-5 years')
  const [selectedAvailability, setSelectedAvailability] = useState('Part-Time')
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Daytime Restorative Support',
    'Overnight Infant Care',
    'Breastfeeding Guidance',
  ])
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    phone?: string
    city?: string
    password?: string
    confirmPassword?: string
    qualifications?: string
    terms?: string
  }>({})

  const isCaregiver = selectedRole === 'caregiver'

  const validateForm = () => {
    const nextErrors: {
      fullName?: string
      email?: string
      phone?: string
      city?: string
      password?: string
      confirmPassword?: string
      qualifications?: string
      terms?: string
    } = {}

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }

    if (isCaregiver && !city.trim()) {
      nextErrors.city = 'City or subcity is required.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (isCaregiver && !qualifications.trim()) {
      nextErrors.qualifications = 'Please share your qualifications or experience.'
    }

    if (!acceptedTerms) {
      nextErrors.terms = 'You must agree to the terms before continuing.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    console.info('Registration submitted for validation. Connect to backend when ready.', {
      selectedRole,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      specialty: selectedSpecialty,
      experience: selectedExperience,
      availability: selectedAvailability,
      services: selectedServices,
    })

    onCreateAccount()
  }

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    )
  }

  return (
    <main className="mother-signup-page">
      <header className="mother-topbar">
        <div className="mother-header-inner">
          <button type="button" className="mother-brand" aria-label="Tetarasa home" onClick={onBack}>
            <span className="mother-brand-mark">
              <Heart size={18} fill="currentColor" strokeWidth={1.6} />
            </span>
            <span className="mother-brand-text">
              <span className="mother-brand-name">Tetarasa</span>
              <span className="mother-brand-name-am">ትታረሳ</span>
            </span>
          </button>

          <div className="mother-header-actions">
            <button type="button" className="mother-signin-link" onClick={onHaveAccount}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="mother-signup-content">
        <div className="mother-glow mother-glow--top" aria-hidden="true" />
        <div className="mother-glow mother-glow--left" aria-hidden="true" />

        <div className="mother-signup-shell">
          <div className="mother-hero-copy">
            <div className="mother-reassurance-badge">
              <ShieldCheck size={16} />
              <span>Trusted caregiver network in Ethiopia</span>
            </div>

            <h1>Become a Tetarasa caregiver</h1>
          </div>

          <section className="mother-form-card caregiver-card" aria-label="Caregiver sign up form">
            <form className="caregiver-form" onSubmit={handleSubmit} noValidate>
              <div className="caregiver-section">
                <div className="caregiver-section-header">
                  <span className="section-icon section-icon--warm"><UserRound size={16} /></span>
                  <div>
                    <h2>Account & contact details</h2>
                  </div>
                </div>

                <div className="caregiver-grid">
                  <label className="field field--full">
                    <span>Full Name</span>
                    <div className={`input-wrap ${errors.fullName ? 'input-wrap--error' : ''}`}>
                      <UserRound size={18} />
                      <input
                        type="text"
                        placeholder="Elena Rostova"
                        value={fullName}
                        onChange={(event) => {
                          setFullName(event.target.value)
                          if (errors.fullName) {
                            setErrors((current) => ({ ...current, fullName: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                      />
                    </div>
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>

                  <label className="field">
                    <span>Email Address</span>
                    <div className={`input-wrap ${errors.email ? 'input-wrap--error' : ''}`}>
                      <Mail size={18} />
                      <input
                        type="email"
                        placeholder="elena@tetarasa.care"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value)
                          if (errors.email) {
                            setErrors((current) => ({ ...current, email: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>

                  <label className="field">
                    <span>Mobile Phone</span>
                    <div className={`input-wrap ${errors.phone ? 'input-wrap--error' : ''}`}>
                      <Phone size={18} />
                      <input
                        type="tel"
                        placeholder="(555) 234-8901"
                        value={phone}
                        onChange={(event) => {
                          setPhone(event.target.value)
                          if (errors.phone) {
                            setErrors((current) => ({ ...current, phone: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.phone)}
                      />
                    </div>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>

                  <label className="field field--full">
                    <span>City or subcity</span>
                    <div className={`input-wrap ${errors.city ? 'input-wrap--error' : ''}`}>
                      <MapPin size={18} />
                      <input
                        type="text"
                        placeholder="Addis Ababa"
                        value={city}
                        onChange={(event) => {
                          setCity(event.target.value)
                          if (errors.city) {
                            setErrors((current) => ({ ...current, city: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.city)}
                      />
                    </div>
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </label>

                  <label className="field field--full">
                    <span>Create secure password</span>
                    <div className={`input-wrap password-wrap ${errors.password ? 'input-wrap--error' : ''}`}>
                      <LockKeyhole size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value)
                          if (errors.password) {
                            setErrors((current) => ({ ...current, password: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.password)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((current) => !current)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <span className="field-error">{errors.password}</span>}
                  </label>

                  <label className="field field--full">
                    <span>Confirm password</span>
                    <div className={`input-wrap password-wrap ${errors.confirmPassword ? 'input-wrap--error' : ''}`}>
                      <LockKeyhole size={18} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value)
                          if (errors.confirmPassword) {
                            setErrors((current) => ({ ...current, confirmPassword: undefined }))
                          }
                        }}
                        aria-invalid={Boolean(errors.confirmPassword)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowConfirmPassword((current) => !current)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                  </label>
                </div>
              </div>

              <div className="caregiver-section">
                <div className="caregiver-section-header">
                  <span className="section-icon section-icon--sage"><BriefcaseBusiness size={16} /></span>
                  <div>
                    <h2>Specialization & credentials</h2>
                  </div>
                </div>

                <div className="caregiver-stack">
                  <div className="caregiver-inline-group">
                    <span className="group-label">Primary role</span>
                    <div className="choice-pills">
                      {[
                        'Certified Postpartum Doula',
                        'Newborn Care Specialist',
                        'Night Nanny',
                        'IBCLC / Lactation Counselor',
                        'Mothercraft Nurse',
                      ].map((role) => (
                        <button
                          key={role}
                          type="button"
                          className={`choice-pill ${selectedSpecialty === role ? 'choice-pill--active' : ''}`}
                          onClick={() => setSelectedSpecialty(role)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="caregiver-inline-group">
                    <span className="group-label">Years of experience</span>
                    <div className="choice-grid choice-grid--3">
                      {['1-2 years', '3-5 years', '5+ years'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`choice-option ${selectedExperience === option ? 'choice-option--active' : ''}`}
                          onClick={() => setSelectedExperience(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="caregiver-inline-group">
                    <div className="group-header-row">
                      <span className="group-label">Services you wish to offer</span>
                      <span className="group-hint">Select all that apply</span>
                    </div>
                    <div className="service-grid">
                      {[
                        'Daytime Restorative Support',
                        'Overnight Infant Care',
                        'Breastfeeding Guidance',
                        'Postpartum Meal Prep',
                        'Gentle Newborn Sleep Coaching',
                      ].map((service) => (
                        <label key={service} className="service-item">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => toggleService(service)}
                          />
                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="caregiver-inline-group">
                    <span className="group-label">Qualifications & experience</span>
                    <div className={`input-wrap input-wrap--textarea ${errors.qualifications ? 'input-wrap--error' : ''}`}>
                      <BriefcaseBusiness size={18} />
                      <textarea
                        value={qualifications}
                        onChange={(event) => {
                          setQualifications(event.target.value)
                          if (errors.qualifications) {
                            setErrors((current) => ({ ...current, qualifications: undefined }))
                          }
                        }}
                        placeholder="List your certifications, doula training, newborn care experience, or lactation support background"
                        aria-invalid={Boolean(errors.qualifications)}
                      />
                    </div>
                    {errors.qualifications && <span className="field-error">{errors.qualifications}</span>}
                  </div>

                  <div className="caregiver-inline-group">
                    <span className="group-label">Certification documents</span>
                    <label className="upload-zone">
                      <input type="file" multiple />
                      <div className="upload-inner">
                        <span className="upload-icon"><FileText size={22} /></span>
                        <div>
                          <strong>Upload certificates</strong>
                          <small>PDF, JPG, or PNG · CPR, DONA, IBCLC, or other credentials</small>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="caregiver-inline-group">
                    <span className="group-label">Availability</span>
                    <div className="choice-grid choice-grid--3">
                      {['Part-Time', 'Full-Time', 'On-Call'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`choice-option ${selectedAvailability === option ? 'choice-option--active' : ''}`}
                          onClick={() => setSelectedAvailability(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="caregiver-consent">
                <label className="check-row terms-row">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
                  <span>
                    I consent to Tetarasa's background checks and credential review. This is part of our trusted caregiver network.
                  </span>
                </label>
                {errors.terms && <span className="field-error">{errors.terms}</span>}
              </div>

              <div className="caregiver-submit-wrap">
                <button type="submit" className="btn btn-primary auth-submit">
                  Submit caregiver application
                  <ArrowRight size={18} />
                </button>

                <div className="caregiver-meta">
                  <CheckCircle2 size={17} />
                  <span>Applications are reviewed within 48 hours.</span>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </main>
  )
}
