import { Heart } from 'lucide-react'

export function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Tetarasa home">
      <span className="brand-mark" aria-hidden="true">
        <Heart size={20} strokeWidth={2.2} />
      </span>
      <span className="brand-text">
        <span className="brand-name">Tetarasa</span>
        <span className="brand-name-am">ትታረሳ</span>
      </span>
    </a>
  )
}

export function Header({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#benefits">Why Tetarasa</a>
        </nav>
        <div className="header-actions">
          <button type="button" className="btn btn-primary header-cta" onClick={onGetStarted}>
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
