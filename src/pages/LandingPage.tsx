import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  HandHeart,
  Heart,
  Languages,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import MotherBabyIllustration from '../components/MotherBabyIllustration'
import motherBabyImage from '../assets/images/mother-baby.png'

type Step = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Tell us what you need',
    description: 'Share the kind of postnatal support you are looking for and when you need it.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Connect with a caregiver',
    description: 'Your request can be accepted by an available caregiver on the platform.',
    icon: HandHeart,
  },
  {
    number: '03',
    title: 'Focus on recovery',
    description: 'Coordinate the requested support for you and your little one.',
    icon: Heart,
  },
]

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="page-shell">
      <Header onGetStarted={onGetStarted} />

      <main>
        <section className="hero-section section" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> POSTNATAL SUPPORT FOR MOTHERS
              </div>
              <h1>
                Because <span>mothers</span> deserve care, too.
              </h1>
              <p className="hero-description">
                Find postnatal support for you and your baby, with a clear way to request the help you need.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn btn-primary hero-button" onClick={onGetStarted}>
                  Find care <ArrowRight size={17} aria-hidden="true" />
                </button>
                <a className="text-link" href="#how-it-works">
                  How it works <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className="hero-media">
              <MotherBabyIllustration />
            </div>
          </div>
        </section>

        <section className="how-section section" id="how-it-works">
          <div className="section-heading">
            <span className="section-kicker">A little help goes a long way</span>
            <h2>Getting support can feel simple.</h2>
            <p>Three thoughtful steps to help you get started with postnatal care.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <article key={step.number} className="step-card">
                  <div className="step-card-top">
                    <span className="step-number">{step.number}</span>
                    <span className="step-icon-wrap">
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="benefits-section section" id="benefits">
          <div className="benefits-heading">
            <span className="section-kicker">WHY TETARASA</span>
            <h2>
              Support for you and your <em>baby.</em>
            </h2>
            <p>
              Caring for a newborn can be challenging. You deserve support as you recover and adjust to life with
              your little one.
            </p>
          </div>

          <div className="benefits-content">
            <div className="benefits-image">
              <div className="image-decoration" aria-hidden="true" />

              <img src={motherBabyImage} alt="A mother gently holding her newborn baby" />

              <div className="benefits-image-note">
                <Heart size={22} />
                <strong>Care for you.</strong>
                <span>Gentle support</span>
              </div>
            </div>

            <div className="benefits-list">
              <article className="benefit-item">
                <span className="benefit-number">01</span>
                <div>
                  <h3>Find the right care</h3>
                  <p>Discover caregivers who can support you and your baby after birth.</p>
                </div>
                <ArrowUpRight className="benefit-arrow" size={20} />
              </article>

              <article className="benefit-item">
                <span className="benefit-number">02</span>
                <div>
                  <h3>Request care simply</h3>
                  <p>Tell us what kind of support you need in just a few steps.</p>
                </div>
                <ArrowUpRight className="benefit-arrow" size={20} />
              </article>

              <article className="benefit-item">
                <span className="benefit-number">03</span>
                <div>
                  <h3>Know what's happening</h3>
                  <p>Follow your care request and see when a caregiver accepts it.</p>
                </div>
                <ArrowUpRight className="benefit-arrow" size={20} />
              </article>
            </div>
          </div>
        </section>

        <section className="caregivers-section section" id="caregivers">
          <div className="caregivers-heading">
            <div>
              <span className="section-kicker">MEET THE CAREGIVERS</span>
              <h2>
                Support starts with <em>people.</em>
              </h2>
            </div>
            <p>Get to know the caregivers who may support you and your baby after birth.</p>
          </div>

          <div className="caregiver-preview-note">
            <span className="caregiver-note-dot" aria-hidden="true" />
            
          </div>

          <div className="caregiver-grid">
            {[
              { initials: 'AM', name: 'Caregiver name', area: 'Area served', languages: 'Languages spoken', tone: 'peach' },
              { initials: 'CG', name: 'Caregiver name', area: 'Area served', languages: 'Languages spoken', tone: 'sage' },
              { initials: 'NP', name: 'Caregiver name', area: 'Area served', languages: 'Languages spoken', tone: 'sand' },
            ].map((caregiver) => (
              <article className="caregiver-card" key={caregiver.initials}>
                <div className={`caregiver-avatar caregiver-avatar-${caregiver.tone}`} aria-hidden="true">
                  <span>{caregiver.initials}</span>
                  <span className="caregiver-avatar-sparkle">✳</span>
                </div>
                <div className="caregiver-card-content">
                  <span className="caregiver-label">CAREGIVER PROFILE</span>
                  <h3>{caregiver.name}</h3>
                  <div className="caregiver-detail">
                    <MapPin size={15} aria-hidden="true" />
                    <span>{caregiver.area}</span>
                  </div>
                  <div className="caregiver-detail">
                    <Languages size={15} aria-hidden="true" />
                    <span>{caregiver.languages}</span>
                  </div>
                  <button className="caregiver-profile-link" type="button" onClick={onGetStarted}>
                    View profile <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-section section">
          <div className="closing-card">
            <div className="closing-orb closing-orb-one" aria-hidden="true" />
            <div className="closing-orb closing-orb-two" aria-hidden="true" />

            <div className="closing-content">
              <span className="closing-eyebrow">
                <Heart size={15} aria-hidden="true" />
                SUPPORT THAT FEELS LIKE CARE
              </span>

              <h2>
                Your baby deserves care.
                <br />
                <em>So do you.</em>
              </h2>

              <p>Start with a simple request and let support come to you.</p>

              <button type="button" className="closing-button" onClick={onGetStarted}>
                Get started
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="closing-heart-decoration" aria-hidden="true">
              <Heart size={100} strokeWidth={0.8} />
            </div>
          </div>
        </section>
      </main>

      <Footer onGetStarted={onGetStarted} />
    </div>
  )
}
