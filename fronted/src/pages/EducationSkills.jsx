import translations from '../data/translations.js'

function EducationSkills({ language, userData = {}, onNavigate }) {
  const t = translations[language] || translations.en

  const educationData = userData.education || {}

  const highestQualification =
    educationData.highestQualification || t.notAdded

  const fieldOfStudy =
    educationData.fieldOfStudy || t.notAdded

  const skills = Array.isArray(educationData.skills)
    ? educationData.skills
    : educationData.skills
    ? [educationData.skills]
    : []

  const workExperience =
    educationData.workExperience || t.notAdded

  return (
    <section className="page profile-page professional-profile-page">

      {/* HEADER */}
      <div className="profile-page-hero">
        <div>
          <p className="eyebrow">PM-AJAY SAATHI</p>

          <h1>{t.educationSkillsTitle}</h1>

          <p className="lead">
            {t.educationSkillsLead}
          </p>
        </div>

        <div className="profile-hero-icon">
          🎓
        </div>
      </div>

      <div className="profile-content-wrapper">

        {/* EDUCATION */}
        <div className="card professional-card">
          <div className="card-heading">
            <div className="section-icon education-icon">
              🎓
            </div>

            <div>
              <h2>{t.education}</h2>
              <p>
                Your academic background and qualifications
              </p>
            </div>
          </div>

          <div className="professional-info-grid">

            <div className="professional-info-item">
              <span className="info-label">
                {t.highestQualification}
              </span>

              <strong>
                {highestQualification}
              </strong>
            </div>

            <div className="professional-info-item">
              <span className="info-label">
                {t.fieldOfStudy}
              </span>

              <strong>
                {fieldOfStudy}
              </strong>
            </div>

          </div>
        </div>


        {/* SKILLS */}
        <div className="card professional-card">
          <div className="card-heading">
            <div className="section-icon skills-icon">
              🛠
            </div>

            <div>
              <h2>{t.skills}</h2>
              <p>
                Skills identified from your assessment
              </p>
            </div>
          </div>

          {skills.length > 0 ? (
            <div className="professional-tags">
              {skills.map((skill, index) => (
                <span className="professional-tag" key={index}>
                  <span className="tag-check">✓</span>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="professional-empty-state">
              <span>📌</span>
              <p>{t.noSkills}</p>
            </div>
          )}
        </div>


        {/* WORK EXPERIENCE */}
        <div className="card professional-card">
          <div className="card-heading">
            <div className="section-icon experience-icon">
              💼
            </div>

            <div>
              <h2>{t.workExperience}</h2>
              <p>
                Your previous work and professional experience
              </p>
            </div>
          </div>

          <div className="experience-display">
            <span className="experience-label">
              {t.experience}
            </span>

            <strong>
              {workExperience}
            </strong>
          </div>
        </div>


        {/* IMPROVE PROFILE */}
        <div className="profile-highlight professional-highlight">
          <div className="highlight-content">
            <div className="highlight-icon">
              ✨
            </div>

            <div>
              <h2>{t.improveProfile}</h2>

              <p>
                {t.improveProfileText}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary professional-action-btn"
            onClick={() => onNavigate('assessment')}
          >
            {t.updateAssessment}
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  )
}

export default EducationSkills