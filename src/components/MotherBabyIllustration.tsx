import motherCareImage from '../assets/images/mom-care.png'

export default function MotherBabyIllustration() {
  return (
    <div
      className="illustration-card"
      role="img"
      aria-label="A warm illustration of a mother holding her newborn in a calm home setting"
    >
      <img
        className="hero-image"
        src={motherCareImage}
        alt="A mother holding her newborn with support from a caregiver"
      />
    </div>
  )
}

