import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  Mail,
  Phone,
  User,
  UserRound,
  Verified,
} from 'lucide-react'
import './MotherSignUpPage.css'

export interface MotherSignUpData {
  fullName: string
  email: string
  phone: string
  password: string
}

interface MotherSignUpPageProps {
  onBack: () => void
  onSignIn: () => void
  onCreateAccount: (data: MotherSignUpData) => void
}

export default function MotherSignUpPage({
  onBack,
  onSignIn,
  onCreateAccount,
}: MotherSignUpPageProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!phone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    onCreateAccount({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    })
  }

  return (
    <main className="mother-signup-page">
      <header className="mother-topbar">
        <div className="mother-header-inner">
          <button type="button" className="mother-brand" onClick={onBack} aria-label="Tetarasa home">
            <span className="mother-brand-mark">
              <Heart size={18} fill="currentColor" strokeWidth={1.6} />
            </span>
            <span className="mother-brand-text">
              <span className="mother-brand-name">Tetarasa</span>
              <span className="mother-brand-name-am">ትታረሳ</span>
            </span>
          </button>

          <div className="mother-header-actions">
            <button type="button" className="mother-signin-link" onClick={onSignIn}>Sign In</button>
          </div>
        </div>
      </header>

      <main className="mother-signup-content">
        <div className="mother-glow mother-glow--top" aria-hidden="true" />
        <div className="mother-glow mother-glow--left" aria-hidden="true" />

        <div className="mother-signup-shell">
          <div className="mother-hero-copy">
            <div className="mother-reassurance-badge">
              <Verified size={16} />
              <span>Trusted postpartum care in Ethiopia</span>
            </div>

            <h1>Create your account</h1>
          </div>

          <section className="mother-form-card" aria-label="Mother sign up form">
            <form className="mother-form" onSubmit={handleSubmit} noValidate>
              <div className="mother-form-section">
                <div className="mother-section-header">
                  <span className="mother-section-icon">
                    <UserRound size={16} />
                  </span>
                  <h2>Sign up</h2>
                </div>

                <div className="mother-form-grid">
                  <label className="mother-field mother-field--full">
                    <span>Full Name</span>
                    <div className="mother-input-wrap">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="e.g. Elena Rostova"
                        autoComplete="name"
                      />
                      <span className="mother-input-icon"><User size={18} /></span>
                    </div>
                  </label>

                  <label className="mother-field">
                    <span>Email Address</span>
                    <div className="mother-input-wrap">
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="elena@example.com"
                        autoComplete="email"
                      />
                      <span className="mother-input-icon"><Mail size={18} /></span>
                    </div>
                  </label>

                  <label className="mother-field">
                    <span>Phone Number</span>
                    <div className="mother-input-wrap">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="(555) 019-2834"
                        autoComplete="tel"
                      />
                      <span className="mother-input-icon"><Phone size={18} /></span>
                    </div>
                  </label>

                  <label className="mother-field mother-field--full">
                    <span>Create a Password</span>
                    <div className="mother-input-wrap mother-input-wrap--password">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 8 warm, memorable characters"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="mother-visibility-toggle"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>

                  <label className="mother-field mother-field--full">
                    <span>Confirm Password</span>
                    <div className="mother-input-wrap mother-input-wrap--password">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="mother-visibility-toggle"
                        onClick={() => setShowConfirmPassword((current) => !current)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="mother-form-alert" role="alert">
                  <Check size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="mother-submit-block">
                <button type="submit" className="mother-primary-submit">
                  <span>Create account</span>
                  <ArrowRight size={18} />
                </button>

                <div className="mother-legal-copy">
                  <p>
                    By joining, you agree to Tetarasa's <a href="#">Privacy Policy</a> and <a href="#">Care Standards</a>.
                  </p>
                  <p>
                    Already have an account?
                    <button type="button" className="mother-inline-link" onClick={onSignIn}>Sign in</button>
                  </p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      <footer className="mother-footer">
        <div className="mother-footer-inner">
          <div className="mother-footer-brand">
            <div className="mother-brand-mark mother-brand-mark--small">
              <Heart size={16} fill="currentColor" strokeWidth={1.6} />
            </div>
            <span>Tetarasa</span>
          </div>
          <p className="mother-footer-note">Compassionate care for mothers across Ethiopia.</p>
        </div>
      </footer>
    </main>
  )
}
