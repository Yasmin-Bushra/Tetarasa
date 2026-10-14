import { useState } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Mail,
} from 'lucide-react'
import { mockAccounts, type MockAccountRole } from '../data/mockAccounts'

export default function LoginPage({
  onBack,
  selectedRole,
  onCreateAccount,
  onSignIn,
  onRoleSelected,
}: {
  onBack: () => void
  selectedRole?: 'mother' | 'caregiver' | null
  onCreateAccount: (role?: 'mother' | 'caregiver') => void
  onSignIn: (email: string, role: MockAccountRole) => void
  onRoleSelected?: (role: MockAccountRole) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [authError, setAuthError] = useState('')

  const validateForm = () => {
    const nextErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const account = mockAccounts.find((mockAccount) =>
      mockAccount.email.toLowerCase() === email.trim().toLowerCase()
      && mockAccount.password === password
      && (!selectedRole || selectedRole === mockAccount.role),
    )

    if (!account) {
      setAuthError('Email or password is incorrect for this account type. Try one of the demo accounts below.')
      return
    }

    setAuthError('')
    onRoleSelected?.(account.role)
    onSignIn(account.email, account.role)
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

        </div>
      </header>

      <main className="mother-signup-content">
        <div className="mother-glow mother-glow--top" aria-hidden="true" />
        <div className="mother-glow mother-glow--left" aria-hidden="true" />

        <div className="mother-signup-shell">
          <div className="mother-hero-copy login-hero-copy">
            <h1>Welcome back</h1>
            <p>Sign in to continue to your Tetarasa account.</p>
          </div>

          <section className="mother-form-card login-form-card" aria-label="Sign in form">
            <form className="mother-form" onSubmit={handleSubmit} noValidate>
              <div className="mother-form-section">
                <div className="mother-form-grid">
                  <label className="mother-field mother-field--full">
                    <span>Email Address</span>
                    <div className={`mother-input-wrap ${errors.email ? 'mother-input-wrap--error' : ''}`}>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value)
                          if (errors.email) {
                            setErrors((current) => ({ ...current, email: undefined }))
                          }
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                      />
                      <span className="mother-input-icon"><Mail size={18} /></span>
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>

                  <label className="mother-field mother-field--full">
                    <span>Password</span>
                    <div className={`mother-input-wrap mother-input-wrap--password ${errors.password ? 'mother-input-wrap--error' : ''}`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value)
                          if (errors.password) {
                            setErrors((current) => ({ ...current, password: undefined }))
                          }
                        }}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.password)}
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
                    {errors.password && <span className="field-error">{errors.password}</span>}
                  </label>
                </div>
              </div>

              {authError && <div className="login-auth-error" role="alert">{authError}</div>}

              <div className="mother-form-section mother-form-section--stacked">
                <div className="mother-cancel-row">
                  <label className="mother-check-row">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button type="button" className="mother-inline-link">Forgot password?</button>
                </div>
              </div>

              <div className="login-demo-accounts">
                <strong>Demo sign in</strong>
                <p>Use either mock account to explore the app:</p>
                {mockAccounts.filter((account) => !selectedRole || account.role === selectedRole).map((account) => (
                  <button className="login-demo-account" type="button" key={account.role} onClick={() => { setEmail(account.email); setPassword(account.password); setAuthError('') }}>
                    <span><b>{account.role === 'mother' ? 'Mother' : 'Caregiver'}</b><small>{account.email}</small></span>
                    <span className="login-demo-password">{account.password}</span>
                  </button>
                ))}
              </div>

              <div className="mother-submit-block">
                <button type="submit" className="mother-primary-submit">
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </button>

                <div className="mother-legal-copy">
                  <p>
                    Don’t have an account yet?
                  </p>
                  <p>
                    <button type="button" className="mother-inline-link" onClick={() => onCreateAccount('mother')}>Sign up as a mother</button>
                    <span>or</span>
                    <button type="button" className="mother-inline-link" onClick={() => onCreateAccount('caregiver')}>Sign up as a caregiver</button>
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
