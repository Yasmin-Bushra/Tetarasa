import { Heart } from 'lucide-react'

export function Footer({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <a className="brand" href="#home" aria-label="Tetarasa home">
            <span className="brand-mark" aria-hidden="true">
              <Heart size={20} strokeWidth={2.2} />
            </span>
            <span className="brand-text">
              <span className="brand-name">Tetarasa</span>
              <span className="brand-name-am">ትታረሳ</span>
            </span>
          </a>
          <p>Caring for mothers, supporting new beginnings.</p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Why Tetarasa</a>
            <a href="#caregivers">Meet the Caregivers</a>
          </nav>
        </div>

        <div className="footer-column">
          <h3>Get Started</h3>
          <div className="footer-actions">
            <button type="button" onClick={onGetStarted}>Find Postnatal Care</button>
            <button type="button" onClick={onGetStarted}>Join as a Caregiver</button>
            <button type="button" onClick={onGetStarted}>Sign In</button>
          </div>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <a href="mailto:hello@tetarasa.com">hello@tetarasa.com</a>
            </li>
            <li>Ethiopia</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Tetarasa</span>
        <span>Built around care, dignity, and support.</span>
      </div>
    </footer>
  )
}
