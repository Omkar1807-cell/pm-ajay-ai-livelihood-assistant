import { useState } from 'react'
import ProfileDropdown from './ProfileDropdown.jsx'

function Navbar({
  currentPage,
  onNavigate,
  userRole,
  userData,
  onLogout,
  language,
  setLanguage,
}) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="navbar">
      <div
        className="brand"
        onClick={() => onNavigate('home')}
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-mark">PM</div>

        <div>
          <strong>PM-AJAY Saathi</strong>
          <span>Livelihood Assistant</span>
        </div>
      </div>

      <div className="navbar-right">
        <nav className="nav-links">

          {!userRole && (
            <button
              type="button"
              className={
                currentPage === 'home'
                  ? 'nav-link active'
                  : 'nav-link'
              }
              onClick={() => onNavigate('home')}
            >
              Home
            </button>
          )}

          {userRole === 'beneficiary' && (
            <>
              <button
                type="button"
                className={
                  currentPage === 'assessment'
                    ? 'nav-link active'
                    : 'nav-link'
                }
                onClick={() => onNavigate('assessment')}
              >
                Assessment
              </button>

              <button
                type="button"
                className={
                  currentPage === 'recommendations'
                    ? 'nav-link active'
                    : 'nav-link'
                }
                onClick={() => onNavigate('recommendations')}
              >
                Recommendations
              </button>
            </>
          )}

          {userRole === 'officer' && (
            <button
              type="button"
              className={
                currentPage === 'dashboard'
                  ? 'nav-link active'
                  : 'nav-link'
              }
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </button>
          )}
        </nav>

        {userRole && (
          <div className="profile-wrapper">
            <button
              type="button"
              className="navbar-profile-button"
              onClick={() => setShowProfile(!showProfile)}
            >
              👤
            </button>

            {showProfile && userRole === 'beneficiary' && (
              <ProfileDropdown
                userData={userData}
                onNavigate={onNavigate}
                onLogout={onLogout}
                language={language}
                setLanguage={setLanguage}
              />
            )}

            {showProfile && userRole === 'officer' && (
              <div className="officer-profile-dropdown">
                <button
                  type="button"
                  className="profile-logout"
                  onClick={onLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar