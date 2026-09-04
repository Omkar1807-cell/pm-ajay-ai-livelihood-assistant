function ProfileDropdown({
  userData,
  onNavigate,
  onLogout,
  language,
  setLanguage,
}) {
  return (
    <div className="profile-dropdown">

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          👤
        </div>

        <h3>{userData?.name || 'User Name'}</h3>

        <p className="beneficiary-id">
          Beneficiary ID: {userData?.beneficiaryId || 'PM00125'}
        </p>

        <p className="profile-location">
          📍 {userData?.location || 'Pune, Maharashtra'}
        </p>
      </div>

      <div className="profile-divider" />

      {/* Main Profile Menu */}
      <div className="profile-menu">

        <button
          type="button"
          onClick={() => onNavigate('myProfile')}
        >
          📋 My Profile
        </button>

        <button
          type="button"
          onClick={() => onNavigate('educationSkills')}
        >
          🎓 Education & Skills
        </button>

        <button
          type="button"
          onClick={() => onNavigate('interestsGoals')}
        >
          🎯 My Interests & Goals
        </button>

        <button
          type="button"
          onClick={() => onNavigate('recommendations')}
        >
          🤖 My AI Recommendations
        </button>

        {/* My Training Journey */}
        <button
          type="button"
          onClick={() => onNavigate('trainingJourney')}
        >
          📚 My Training Journey
        </button>

        <button type="button">
          📄 My Documents
        </button>

      </div>

      <div className="profile-divider" />

      {/* Settings Menu */}
      <div className="profile-menu">

        <button type="button">
          ⚙️ Settings
        </button>

        <button type="button">
          🔐 Privacy & Security
        </button>

        <button
          type="button"
          onClick={() =>
            setLanguage(language === 'en' ? 'mr' : 'en')
          }
        >
          🌐 Language
        </button>

        <button type="button">
          ❓ Help & Support
        </button>

      </div>

      <div className="profile-divider" />

      {/* Logout */}
      <button
        type="button"
        className="profile-logout"
        onClick={onLogout}
      >
        🚪 Logout
      </button>

    </div>
  )
}

export default ProfileDropdown