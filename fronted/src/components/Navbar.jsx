function Navbar({ currentPage, onNavigate, userRole }) {
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

      <nav className="nav-links">
        {/* Login करण्यापूर्वी फक्त Home */}

        {!userRole && (
          <button
            type="button"
            className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
        )}

        {/* Beneficiary Login नंतर */}
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

        {/* Officer Login नंतर */}
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
    </header>
  )
}

export default Navbar