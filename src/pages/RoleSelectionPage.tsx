import { ArrowRight, Heart, HandHeart } from 'lucide-react'
import './RoleSelectionPage.css'

interface RoleSelectionPageProps {
  onBack: () => void
  onSelectRole: (role: 'mother' | 'caregiver') => void
  onSignIn: () => void
}

export default function RoleSelectionPage({
  onBack,
  onSelectRole,
  onSignIn,
}: RoleSelectionPageProps) {
  return (
    <main className="role-page">
      <header className="role-header">
        <button
          className="role-brand"
          onClick={onBack}
          aria-label="Return to home"
          type="button"
        >
          <span className="role-brand-icon">
            <Heart size={21} strokeWidth={1.7} />
          </span>
          <span>Tetarasa</span>
        </button>
      </header>

      <section className="role-content">
        <div className="role-intro">
          

          <h1>
            Welcome to <span>Tetarasa.</span>
          </h1>

          <p>How would you like to use Tetarasa?</p>
        </div>

        <div className="role-options">
          <article className="role-card mother-card">
            <div className="role-icon mother-icon">
              <Heart size={28} strokeWidth={1.5} />
            </div>

            <span className="role-number">01 / FOR MOTHERS</span>

            <h2>I'm a Mother</h2>

            <p className="role-description">
              You deserve care and support, too. Find postnatal care for yourself and your little one.
            </p>

            <button
              className="role-button"
              onClick={() => onSelectRole('mother')}
              type="button"
            >
              <span>Continue as a Mother</span>
              <ArrowRight size={18} />
            </button>
          </article>

          <article className="role-card caregiver-card">
            <div className="role-icon caregiver-icon">
              <HandHeart size={28} strokeWidth={1.5} />
            </div>

            <span className="role-number">02 / FOR CAREGIVERS</span>

            <h2>I'm a Caregiver</h2>

            <p className="role-description">
              Share your experience and compassion by supporting mothers and their babies after birth.
            </p>

            <button
              className="role-button"
              onClick={() => onSelectRole('caregiver')}
              type="button"
            >
              <span>Continue as a Caregiver</span>
              <ArrowRight size={18} />
            </button>
          </article>
        </div>

        <p className="role-signin">
          Already have an account?{' '}
          <button onClick={onSignIn} type="button">Log in</button>
        </p>

        <div className="role-footer">
          <Heart size={13} />
          <span>Supporting mothers, one step at a time.</span>
        </div>
      </section>
    </main>
  )
}
