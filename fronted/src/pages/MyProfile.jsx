function MyProfile({ language, userData, onNavigate }) {
    const content = {
      en: {
        eyebrow: 'BENEFICIARY PROFILE',
        title: 'My Profile',
        subtitle: 'View and manage your personal information and PM-AJAY journey.',
        personalInfo: 'Personal Information',
        name: 'Full Name',
        mobile: 'Mobile Number',
        beneficiaryId: 'Beneficiary ID',
        location: 'Location',
        journey: 'Your PM-AJAY Journey',
        journeyText:
          'Keep your profile information updated to receive more accurate skill and livelihood recommendations.',
        editProfile: 'Edit Profile',
        back: 'Back to Dashboard',
      },
  
      mr: {
        eyebrow: 'लाभार्थी प्रोफाइल',
        title: 'माझे प्रोफाइल',
        subtitle:
          'तुमची वैयक्तिक माहिती आणि PM-AJAY मधील प्रवास येथे पाहा.',
        personalInfo: 'वैयक्तिक माहिती',
        name: 'पूर्ण नाव',
        mobile: 'मोबाईल क्रमांक',
        beneficiaryId: 'लाभार्थी क्रमांक',
        location: 'स्थान',
        journey: 'तुमचा PM-AJAY प्रवास',
        journeyText:
          'अधिक अचूक कौशल्य आणि उपजीविका शिफारसी मिळवण्यासाठी तुमची माहिती अद्ययावत ठेवा.',
        editProfile: 'प्रोफाइल संपादित करा',
        back: 'डॅशबोर्डवर परत जा',
      },
  
      hi: {
        eyebrow: 'लाभार्थी प्रोफाइल',
        title: 'मेरी प्रोफाइल',
        subtitle:
          'अपनी व्यक्तिगत जानकारी और PM-AJAY यात्रा देखें और प्रबंधित करें।',
        personalInfo: 'व्यक्तिगत जानकारी',
        name: 'पूरा नाम',
        mobile: 'मोबाइल नंबर',
        beneficiaryId: 'लाभार्थी आईडी',
        location: 'स्थान',
        journey: 'आपकी PM-AJAY यात्रा',
        journeyText:
          'अधिक सटीक कौशल और आजीविका सुझाव प्राप्त करने के लिए अपनी जानकारी अपडेट रखें।',
        editProfile: 'प्रोफाइल संपादित करें',
        back: 'डैशबोर्ड पर वापस जाएं',
      },
    }
  
    const t = content[language] || content.en
  
    return (
      <section className="profile-page">
        {/* Header */}
  
        <div className="profile-page-header">
          <div>
            <p className="profile-eyebrow">{t.eyebrow}</p>
  
            <h1>{t.title}</h1>
  
            <p>{t.subtitle}</p>
          </div>
        </div>
  
        {/* Profile Main Card */}
  
        <div className="profile-main-card">
  
          <div className="profile-user-summary">
            <div className="profile-large-avatar">
              👤
            </div>
  
            <div className="profile-user-details">
              <h2>{userData?.name || 'User Name'}</h2>
  
              <p>
                {userData?.beneficiaryId || 'PM00125'}
              </p>
  
              <span className="profile-status">
                ● Active Beneficiary
              </span>
            </div>
          </div>
  
          <button
            type="button"
            className="profile-edit-button"
          >
            ✏️ {t.editProfile}
          </button>
  
        </div>
  
        {/* Information Grid */}
  
        <div className="profile-info-section">
          <h2>{t.personalInfo}</h2>
  
          <div className="profile-info-grid">
  
            <div className="profile-info-item">
              <div className="profile-info-icon">👤</div>
  
              <div>
                <span>{t.name}</span>
                <strong>{userData?.name || 'User Name'}</strong>
              </div>
            </div>
  
  
            <div className="profile-info-item">
              <div className="profile-info-icon">📱</div>
  
              <div>
                <span>{t.mobile}</span>
                <strong>{userData?.mobile || '+91 98765 43210'}</strong>
              </div>
            </div>
  
  
            <div className="profile-info-item">
              <div className="profile-info-icon">🪪</div>
  
              <div>
                <span>{t.beneficiaryId}</span>
                <strong>
                  {userData?.beneficiaryId || 'PM00125'}
                </strong>
              </div>
            </div>
  
  
            <div className="profile-info-item">
              <div className="profile-info-icon">📍</div>
  
              <div>
                <span>{t.location}</span>
                <strong>
                  {userData?.location || 'Pune, Maharashtra'}
                </strong>
              </div>
            </div>
  
          </div>
        </div>
  
  
        {/* PM AJAY Journey */}
  
        <div className="profile-journey-card">
  
          <div className="profile-journey-icon">
            🚀
          </div>
  
          <div>
            <h2>{t.journey}</h2>
  
            <p>{t.journeyText}</p>
          </div>
  
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('assessment')}
          >
            Continue Journey →
          </button>
  
        </div>
  
      </section>
    )
  }
  
  export default MyProfile