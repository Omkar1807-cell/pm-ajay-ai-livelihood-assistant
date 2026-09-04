import translations from '../data/translations.js'

function InterestsGoals({ language, userData = {}, onNavigate }) {
  const t = translations[language] || translations.en

  const interestsGoalsData = userData.interestsGoals || {}

  const interests = Array.isArray(interestsGoalsData.interests)
    ? interestsGoalsData.interests
    : interestsGoalsData.interests
    ? [interestsGoalsData.interests]
    : []

  const careerGoal = interestsGoalsData.careerGoal || ''

  return (
    <section className="page profile-page professional-profile-page">

      {/* HEADER */}
      <div className="profile-page-hero">
        <div>
          <p className="eyebrow">PM-AJAY SAATHI</p>

          <h1>{t.interestsGoalsTitle}</h1>

          <p className="lead">
            {t.interestsGoalsLead}
          </p>
        </div>

        <div className="profile-hero-icon">
          🎯
        </div>
      </div>


      <div className="profile-content-wrapper">

        {/* MY INTERESTS */}
        <div className="card professional-card">

          <div className="card-heading">
            <div className="section-icon interests-icon">
              🎯
            </div>

            <div>
              <h2>{t.myInterests}</h2>

              <p>
                {t.myInterestsDescription}
              </p>
            </div>
          </div>

          {interests.length > 0 ? (
            <div className="professional-tags interests-tags">

              {interests.map((interest, index) => (
                <span className="professional-tag interest-tag" key={index}>
                  <span className="tag-check">✓</span>
                  {interest}
                </span>
              ))}

            </div>
          ) : (
            <div className="professional-empty-state">
              <span>💡</span>
              <p>{t.noInterests}</p>
            </div>
          )}

        </div>


        {/* CAREER GOALS */}
        <div className="card professional-card">

          <div className="card-heading">
            <div className="section-icon career-icon">
              🚀
            </div>

            <div>
              <h2>{t.careerGoals}</h2>

              <p>
                {t.careerGoalsDescription}
              </p>
            </div>
          </div>

          {careerGoal ? (
            <div className="career-goal-display">

              <div className="career-goal-icon">
                🎯
              </div>

              <div>
                <span className="info-label">
                  {t.careerGoals}
                </span>

                <strong>
                  {careerGoal}
                </strong>
              </div>

            </div>
          ) : (
            <div className="professional-empty-state">
              <span>🚀</span>
              <p>{t.noCareerGoals}</p>
            </div>
          )}

        </div>


        {/* FUTURE DIRECTION */}
        <div className="profile-highlight professional-highlight future-highlight">

          <div className="highlight-content">

            <div className="highlight-icon">
              ✨
            </div>

            <div>
              <h2>{t.futureDirection}</h2>

              <p>
                {t.futureDirectionText}
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

export default InterestsGoals