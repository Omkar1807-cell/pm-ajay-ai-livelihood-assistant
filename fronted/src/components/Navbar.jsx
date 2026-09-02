const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'dashboard', label: 'Dashboard' },
]

function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          type="button"
          className="brand"
          onClick={() => onNavigate('home')}
        >
          <span className="brand-mark" aria-hidden="true">
            PM
          </span>
          <span className="brand-text">
            <strong>PM-AJAY Saathi</strong>
            <span>Livelihood Assistant</span>
          </span>
        </button>

        <nav className="nav-links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={currentPage === item.id ? 'nav-link active' : 'nav-link'}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
