import { useState } from 'react'

function BeneficiaryLogin({ onNavigate, setUserData }) {
  const [username, setUsername] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim()) {
      setError('Please enter your username.')
      return
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setError('')

    setUserData({
      username: username.trim(),
      mobile,
    })

    onNavigate('otpVerification')
  }

  return (
    <section className="page login-page">
      <div className="login-card card">
        <button
          type="button"
          className="back-button"
          onClick={() => onNavigate('home')}
        >
          ← Back to Home
        </button>

        <div className="login-heading">
          <span className="login-icon">👤</span>
          <h1>Beneficiary Login</h1>
          <p>
            Login to access your personalised skill and livelihood assessment.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>

            <div className="mobile-input">
              <span>+91</span>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                maxLength="10"
                onChange={(event) =>
                  setMobile(event.target.value.replace(/\D/g, ''))
                }
              />
            </div>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="btn btn-primary login-submit">
            Send OTP
          </button>
        </form>

        <p className="login-note">
          For the MVP demo, OTP verification is simulated.
        </p>
      </div>
    </section>
  )
}

export default BeneficiaryLogin