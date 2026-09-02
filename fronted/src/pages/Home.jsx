import { useState } from 'react'

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'mr', label: 'मराठी' },
]

function Home({ onNavigate }) {
  const [language, setLanguage] = useState('en')

  return (
    <section className="page home-page">
      <div className="hero-card card">
        <p className="eyebrow">PM-AJAY · Skill & Livelihood Support</p>
        <h1>Discover Your Skills. Build Your Future.</h1>
        <p className="lead">
          PM-AJAY Saathi helps beneficiaries discover suitable skills, training
          pathways and livelihood opportunities using AI. Answer a short
          assessment to receive personalised guidance aligned with government
          schemes and local opportunities.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('assessment')}
        >
          Start Assessment
        </button>

        <div className="language-block">
          <p className="language-label">Select language</p>
          <div className="language-row" role="group" aria-label="Language">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                className={
                  language === lang.id
                    ? 'btn btn-language active'
                    : 'btn btn-language'
                }
                onClick={() => setLanguage(lang.id)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="info-grid">
        <article className="card info-card">
          <h2>Skill discovery</h2>
          <p>
            Identify strengths and interests that match practical training and
            livelihood options.
          </p>
        </article>
        <article className="card info-card">
          <h2>Training pathways</h2>
          <p>
            See recommended courses and next steps that fit your background and
            location.
          </p>
        </article>
        <article className="card info-card">
          <h2>Livelihood options</h2>
          <p>
            Explore self-employment and wage opportunities linked to PM-AJAY
            support.
          </p>
        </article>
      </div>
    </section>
  )
}

export default Home
