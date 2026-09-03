import { useState } from 'react'

function OfficerLogin({
    onLogin
}) {
  const [officerId, setOfficerId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()

    if (!officerId.trim()) {
      setError('Please enter your Officer ID.')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    // Demo login validation
    if (officerId !== 'OFFICER001' || password !== 'admin123') {
      setError('Invalid Officer ID or Password.')
      return
    }

    setError('')
    onLogin('officer')
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
          <span className="login-icon">🏢</span>
          <h1>Department Officer Login</h1>
          <p>
            Login to access the PM-AJAY administrative dashboard.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="officerId">Officer ID</label>
            <input
              id="officerId"
              type="text"
              placeholder="Enter Officer ID"
              value={officerId}
              onChange={(event) => setOfficerId(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="btn btn-primary login-submit">
            Login as Officer
          </button>
        </form>

        <button
          type="button"
          className="forgot-password"
          onClick={() => setShowForgotPassword(!showForgotPassword)}
        >
          Forgot Password?
        </button>

        {showForgotPassword && (
          <div className="forgot-message">
            Please contact the PM-AJAY system administrator to reset your
            password.
          </div>
        )}

        <div className="demo-credentials">
          <strong>Demo Credentials</strong>
          <br />
          Officer ID: OFFICER001
          <br />
          Password: admin123
        </div>
      </div>
    </section>
  )
}

export default OfficerLogin