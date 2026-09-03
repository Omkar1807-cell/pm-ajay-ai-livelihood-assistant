import { useState } from 'react'

function OTPVerification({ onLogin, onNavigate, userData }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  function handleVerify(event) {
    event.preventDefault()

    if (otp !== '123456') {
      setError('Invalid OTP. Please enter 123456 for demo.')
      return
    }

    setError('')

    // आता beneficiary officially login झाला
    onLogin('beneficiary')
  }

  return (
    <section className="page login-page">
      <div className="login-card card">
        <h1>OTP Verification</h1>

        <p>
          OTP sent to {userData?.mobile || 'your mobile number'}
        </p>

        <form onSubmit={handleVerify}>
          <label>
            Enter OTP
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
            />
          </label>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button type="submit">
            Verify OTP
          </button>
        </form>

        <button
          type="button"
          onClick={() => onNavigate('beneficiaryLogin')}
        >
          Back to Login
        </button>
      </div>
    </section>
  )
}

export default OTPVerification