function Home({ onNavigate }) {
  return (
    <section className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">
            PM-AJAY DIGITAL INITIATIVE
          </p>

          <h1>
            AI-Powered <span>Livelihood & Skill</span> Assistant
          </h1>

          <p className="hero-description">
            PM-AJAY Saathi is an intelligent digital platform designed to help
            beneficiaries identify suitable skills, training opportunities and
            livelihood pathways using personalised AI-based recommendations.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn btn-primary hero-btn"
              onClick={() => onNavigate('beneficiaryLogin')}
            >
              👤 Beneficiary Login
            </button>

            <button
              type="button"
              className="btn btn-primary hero-btn"
              onClick={() => onNavigate('officerLogin')}
            >
              🏢 Department Officer Login
            </button>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">
          <div className="hero-circle">
            🤖
          </div>

          <div className="hero-card hero-card-one">
            🎯 AI Recommendations
          </div>

          <div className="hero-card hero-card-two">
            📚 Skill Development
          </div>
        </div>
      </section>

      {/* ABOUT / FEATURES SECTION */}
      <section className="home-section">
        <div className="section-heading">
          <h2>How PM-AJAY Saathi Helps You</h2>

          <p>
            Our platform connects beneficiaries with personalised guidance,
            skill development opportunities and livelihood pathways.
          </p>
        </div>

        <div className="feature-grid">

          <article className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Recommendations</h3>
            <p>
              Get personalised livelihood and skill recommendations based on
              your interests, education and assessment responses.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Skill Development</h3>
            <p>
              Discover suitable training programmes and opportunities to
              improve your professional skills.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Livelihood Opportunities</h3>
            <p>
              Explore employment, self-employment and livelihood pathways
              suitable for your profile.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Your Journey</h3>
            <p>
              Monitor your assessment progress, recommendations, training and
              overall livelihood development journey.
            </p>
          </article>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section how-it-works">
        <div className="section-heading">
          <h2>How It Works</h2>

          <p>
            Getting started with PM-AJAY Saathi is simple and personalised.
          </p>
        </div>

        <div className="steps-grid">

          <div className="step-item">
            <span>1</span>
            <h3>Login</h3>
            <p>
              Login as a beneficiary using your registered mobile number and
              OTP verification.
            </p>
          </div>

          <div className="step-item">
            <span>2</span>
            <h3>Complete Assessment</h3>
            <p>
              Answer a few simple questions about your education, interests,
              skills and career goals.
            </p>
          </div>

          <div className="step-item">
            <span>3</span>
            <h3>Get Recommendations</h3>
            <p>
              Receive AI-powered recommendations for suitable skills, training
              and livelihood opportunities.
            </p>
          </div>

          <div className="step-item">
            <span>4</span>
            <h3>Build Your Future</h3>
            <p>
              Explore opportunities, develop your skills and move towards
              sustainable livelihood outcomes.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta">
        <h2>Start Your Livelihood Journey Today</h2>

        <p>
          Discover personalised opportunities and take the next step towards a
          better future.
        </p>

        <button
          type="button"
          className="btn"
          onClick={() => onNavigate('beneficiaryLogin')}
        >
          Get Started as Beneficiary
        </button>
      </section>

    </section>
  )
}

export default Home