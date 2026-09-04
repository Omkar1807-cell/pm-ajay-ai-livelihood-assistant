const trainingData = [
    {
      id: 1,
      title: 'Digital & Computer Skills',
      provider: 'PM-AJAY Skill Development Centre',
      progress: 75,
      status: 'In Progress',
      duration: '3 Months',
      lessons: '18 / 24 Lessons Completed',
      icon: '💻',
    },
    {
      id: 2,
      title: 'Communication & Employability Skills',
      provider: 'PM-AJAY Training Programme',
      progress: 100,
      status: 'Completed',
      duration: '1 Month',
      lessons: '12 / 12 Lessons Completed',
      icon: '🗣️',
    },
  ]
  
  const upcomingSessions = [
    {
      title: 'MS Office Advanced Practice',
      date: '15 March 2026',
      time: '10:00 AM - 12:00 PM',
    },
    {
      title: 'Digital Payments & Online Services',
      date: '18 March 2026',
      time: '11:00 AM - 1:00 PM',
    },
    {
      title: 'Career Guidance Session',
      date: '22 March 2026',
      time: '2:00 PM - 3:00 PM',
    },
  ]
  
  const skillsLearned = [
    'Basic Computer',
    'MS Word',
    'MS Excel',
    'Digital Payments',
    'Communication Skills',
    'Online Services',
  ]
  
  function TrainingJourney() {
    return (
      <section className="page training-page">
  
        {/* Header */}
  
        <div className="page-header training-header">
          <p className="eyebrow">MY LEARNING JOURNEY</p>
  
          <h1>My Training Journey 🎓</h1>
  
          <p className="lead">
            Track your training progress, skills, certificates and upcoming sessions.
          </p>
        </div>
  
  
        {/* Summary Cards */}
  
        <div className="training-summary-grid">
  
          <div className="card training-summary-card">
            <div className="summary-icon">📚</div>
  
            <div>
              <p>Courses Enrolled</p>
              <h2>2</h2>
            </div>
          </div>
  
  
          <div className="card training-summary-card">
            <div className="summary-icon">⏳</div>
  
            <div>
              <p>In Progress</p>
              <h2>1</h2>
            </div>
          </div>
  
  
          <div className="card training-summary-card">
            <div className="summary-icon">🎓</div>
  
            <div>
              <p>Completed</p>
              <h2>1</h2>
            </div>
          </div>
  
  
          <div className="card training-summary-card">
            <div className="summary-icon">🏆</div>
  
            <div>
              <p>Certificates</p>
              <h2>1</h2>
            </div>
          </div>
  
        </div>
  
  
        {/* Training Courses */}
  
        <div className="training-section-header">
          <div>
            <h2>My Courses</h2>
  
            <p>
              Track your current and completed training programmes.
            </p>
          </div>
        </div>
  
  
        <div className="training-courses-grid">
  
          {trainingData.map((course) => (
            <article
              className="card training-course-card"
              key={course.id}
            >
  
              <div className="course-top">
  
                <div className="course-icon">
                  {course.icon}
                </div>
  
                <span
                  className={
                    course.status === 'Completed'
                      ? 'course-status completed'
                      : 'course-status progress'
                  }
                >
                  {course.status}
                </span>
  
              </div>
  
  
              <h2>{course.title}</h2>
  
              <p className="course-provider">
                {course.provider}
              </p>
  
  
              <div className="course-details">
  
                <span>🕒 {course.duration}</span>
  
                <span>📖 {course.lessons}</span>
  
              </div>
  
  
              <div className="course-progress-header">
  
                <span>Training Progress</span>
  
                <strong>{course.progress}%</strong>
  
              </div>
  
  
              <div className="course-progress-track">
  
                <div
                  className="course-progress-fill"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />
  
              </div>
  
  
              <button className="btn btn-primary training-btn">
                {course.status === 'Completed'
                  ? 'View Certificate'
                  : 'Continue Learning'}
              </button>
  
            </article>
          ))}
  
        </div>
  
  
        {/* Bottom Grid */}
  
        <div className="training-bottom-grid">
  
  
          {/* Upcoming Sessions */}
  
          <div className="card upcoming-card">
  
            <div className="section-title-row">
  
              <div>
                <h2>Upcoming Sessions</h2>
  
                <p>Your next training activities.</p>
              </div>
  
              <span className="section-icon">📅</span>
  
            </div>
  
  
            <div className="upcoming-list">
  
              {upcomingSessions.map((session) => (
                <div
                  className="upcoming-item"
                  key={session.title}
                >
  
                  <div className="upcoming-date-icon">
                    📘
                  </div>
  
  
                  <div className="upcoming-info">
  
                    <h3>{session.title}</h3>
  
                    <p>
                      {session.date}
                    </p>
  
                    <span>
                      {session.time}
                    </span>
  
                  </div>
  
                </div>
              ))}
  
            </div>
  
          </div>
  
  
          {/* Skills Learned */}
  
          <div className="card skills-card">
  
            <div className="section-title-row">
  
              <div>
                <h2>Skills Learned</h2>
  
                <p>Skills you have developed so far.</p>
              </div>
  
              <span className="section-icon">✨</span>
  
            </div>
  
  
            <div className="skills-list">
  
              {skillsLearned.map((skill) => (
                <span
                  className="skill-tag"
                  key={skill}
                >
                  ✓ {skill}
                </span>
              ))}
  
            </div>
  
  
            <div className="skills-footer">
  
              <strong>
                Great progress! Keep learning.
              </strong>
  
              <p>
                Complete your remaining lessons to unlock more opportunities.
              </p>
  
            </div>
  
          </div>
  
        </div>
  
  
        {/* Certificate */}
  
        <div className="card certificate-banner">
  
          <div className="certificate-icon">
            🏆
          </div>
  
  
          <div className="certificate-content">
  
            <h2>
              Congratulations on completing your training!
            </h2>
  
            <p>
              You have successfully completed Communication &
              Employability Skills training.
            </p>
  
          </div>
  
  
          <button className="btn btn-primary">
            View Certificate
          </button>
  
        </div>
  
      </section>
    )
  }
  
  export default TrainingJourney