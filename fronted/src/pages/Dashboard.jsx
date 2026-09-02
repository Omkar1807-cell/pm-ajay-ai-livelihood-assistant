const dashboardData = [
  {
    label: 'Assessment Status',
    value: 'Completed',
    description: 'Your livelihood assessment has been completed.',
  },
  {
    label: 'Questions Answered',
    value: '5 / 5',
    description: 'All assessment questions have been answered.',
  },
  {
    label: 'Recommended Areas',
    value: '3',
    description: 'Skills and livelihood pathways identified for you.',
  },
]

function Dashboard() {
  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">Your Progress</p>

        <h1>Dashboard</h1>

        <p className="lead">
          Track your assessment progress and explore your personalised
          livelihood recommendations.
        </p>
      </div>

      <div className="dashboard-grid">
        {dashboardData.map((item) => (
          <article className="card dashboard-card" key={item.label}>
            <p className="dashboard-label">{item.label}</p>

            <h2 className="dashboard-value">{item.value}</h2>

            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="card dashboard-summary">
        <h2>Your Next Step</h2>

        <p>
          Your assessment is complete. Review your personalised
          recommendations and explore suitable skill training and livelihood
          opportunities.
        </p>

        <button className="btn btn-primary">
          View Recommendations
        </button>
      </div>
    </section>
  )
}

export default Dashboard