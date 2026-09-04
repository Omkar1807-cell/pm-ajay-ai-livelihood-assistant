import { useState } from 'react'

const dashboardStats = [
  {
    icon: '👥',
    label: 'Total Beneficiaries',
    value: '1,250',
    change: '+12% this month',
  },
  {
    icon: '🤖',
    label: 'AI Recommendations',
    value: '850',
    change: '68% completed',
  },
  {
    icon: '📚',
    label: 'In Training',
    value: '620',
    change: 'Active learners',
  },
  {
    icon: '🎓',
    label: 'Certified',
    value: '380',
    change: 'Training completed',
  },
  {
    icon: '💼',
    label: 'Livelihood Outcome',
    value: '210',
    change: 'Successfully placed',
  },
  {
    icon: '⚠️',
    label: 'Action Required',
    value: '25',
    change: 'Needs attention',
    alert: true,
  },
]

const beneficiaries = [
  {
    id: 'PM00125',
    name: 'Rahul Patil',
    education: '12th Pass',
    interest: 'Agriculture',
    recommendation: 'Modern Farming',
    status: 'In Training',
  },
  {
    id: 'PM00126',
    name: 'Priya Shinde',
    education: 'Graduate',
    interest: 'Digital Services',
    recommendation: 'Computer Skills',
    status: 'Recommended',
  },
  {
    id: 'PM00127',
    name: 'Amit Jadhav',
    education: '10th Pass',
    interest: 'Electrical Work',
    recommendation: 'Electrician Training',
    status: 'Certified',
  },
  {
    id: 'PM00128',
    name: 'Sneha Pawar',
    education: '12th Pass',
    interest: 'Tailoring',
    recommendation: 'Fashion & Tailoring',
    status: 'In Training',
  },
  {
    id: 'PM00129',
    name: 'Vikas More',
    education: 'ITI',
    interest: 'Automobile',
    recommendation: 'Automotive Technician',
    status: 'Action Required',
  },
]

function Dashboard() {
  const [search, setSearch] = useState('')

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    `${beneficiary.name} ${beneficiary.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <section className="page dashboard-page">

      {/* HEADER */}

      <div className="page-header dashboard-header">
        <div>
          <p className="eyebrow">
            PM-AJAY ADMINISTRATION PORTAL
          </p>

          <h1>👋 Welcome, District Officer</h1>

          <p className="lead">
            📍 Pune District
          </p>
        </div>

        <div className="dashboard-date">
          <span>District Monitoring</span>
          <strong>Live Overview</strong>
        </div>
      </div>


      {/* STATISTICS */}

      <div className="dashboard-grid">
        {dashboardStats.map((item) => (
          <article
            className={
              item.alert
                ? 'card dashboard-card action-card'
                : 'card dashboard-card'
            }
            key={item.label}
          >
            <div className="dashboard-stat-icon">
              {item.icon}
            </div>

            <div className="dashboard-stat-content">
              <p className="dashboard-label">
                {item.label}
              </p>

              <h2 className="dashboard-value">
                {item.value}
              </h2>

              <span className="dashboard-change">
                {item.change}
              </span>
            </div>
          </article>
        ))}
      </div>


      {/* OVERVIEW */}

      <div className="card dashboard-summary">
        <div className="section-heading">
          <div>
            <h2>District Overview</h2>

            <p>
              Monitor beneficiary progress across Pune District.
            </p>
          </div>
        </div>

        <div className="overview-progress-grid">

          <div className="overview-progress-item">
            <div className="overview-progress-top">
              <span>Assessment Completion</span>
              <strong>82%</strong>
            </div>

            <div className="overview-progress-bar">
              <div
                className="overview-progress-fill"
                style={{ width: '82%' }}
              />
            </div>
          </div>

          <div className="overview-progress-item">
            <div className="overview-progress-top">
              <span>Training Participation</span>
              <strong>64%</strong>
            </div>

            <div className="overview-progress-bar">
              <div
                className="overview-progress-fill"
                style={{ width: '64%' }}
              />
            </div>
          </div>

          <div className="overview-progress-item">
            <div className="overview-progress-top">
              <span>Certification Rate</span>
              <strong>48%</strong>
            </div>

            <div className="overview-progress-bar">
              <div
                className="overview-progress-fill"
                style={{ width: '48%' }}
              />
            </div>
          </div>

        </div>
      </div>


      {/* BENEFICIARY TABLE */}

      <div className="card beneficiaries-section">

        <div className="beneficiaries-header">

          <div>
            <h2>Recent Beneficiaries</h2>

            <p>
              View beneficiary assessments, interests and recommendations.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search beneficiary..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="beneficiary-search"
          />

        </div>


        <div className="beneficiary-table-wrapper">

          <table className="beneficiary-table">

            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Education</th>
                <th>Interest</th>
                <th>AI Recommendation</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredBeneficiaries.map((beneficiary) => (

                <tr key={beneficiary.id}>

                  <td>

                    <div className="beneficiary-name">

                      <div className="beneficiary-avatar">
                        {beneficiary.name.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {beneficiary.name}
                        </strong>

                        <span>
                          {beneficiary.id}
                        </span>
                      </div>

                    </div>

                  </td>

                  <td>
                    {beneficiary.education}
                  </td>

                  <td>
                    {beneficiary.interest}
                  </td>

                  <td>
                    {beneficiary.recommendation}
                  </td>

                  <td>

                    <span
                      className={`status-badge ${beneficiary.status
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {beneficiary.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ACTION SECTION */}

      <div className="dashboard-bottom-grid">

        <div className="card dashboard-insight-card">

          <h2>📊 Quick Insights</h2>

          <ul className="insight-list">

            <li>
              <strong>Top Interest:</strong>
              Agriculture & Allied Skills
            </li>

            <li>
              <strong>Most Recommended:</strong>
              Digital & Computer Skills
            </li>

            <li>
              <strong>Highest Demand:</strong>
              Skill Development Training
            </li>

          </ul>

        </div>


        <div className="card dashboard-action-panel">

          <div>
            <h2>⚠️ Attention Required</h2>

            <p>
              25 beneficiaries require follow-up regarding training,
              assessment or livelihood progress.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
          >
            Review Cases
          </button>

        </div>

      </div>

    </section>
  )
}

export default Dashboard