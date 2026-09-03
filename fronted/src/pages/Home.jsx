function Home({ onNavigate }) {
  return (
    <section className="login-home-page">
      <div className="login-hero">
        <p className="login-eyebrow">PM-AJAY</p>

        <h1>AI Livelihood & Skilling Assistant</h1>

        <p className="marathi-tagline">
          “तुमच्या कौशल्यातून<br />
          तुमच्या रोजगारापर्यंत”
        </p>

        <div className="login-options">
          <button
            type="button"
            className="login-card beneficiary-card"
            onClick={() => onNavigate('beneficiaryLogin')}
          >
            <span className="login-icon">👤</span>
            <span>Beneficiary Login</span>
          </button>

          <button
            type="button"
            className="login-card officer-card"
            onClick={() => onNavigate('officerLogin')}
          >
            <span className="login-icon">🏢</span>
            <span>Department Officer Login</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home