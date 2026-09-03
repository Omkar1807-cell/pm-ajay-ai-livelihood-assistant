import { useState } from 'react'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BeneficiaryLogin from './pages/BeneficiaryLogin.jsx'
import OTPVerification from './pages/OTPVerification.jsx'
import OfficerLogin from './pages/OfficerLogin.jsx'

import './App.css'

const PAGES = {
  home: Home,
  beneficiaryLogin: BeneficiaryLogin,
  otpVerification: OTPVerification,
  officerLogin: OfficerLogin,
  assessment: Assessment,
  recommendations: Recommendations,
  dashboard: Dashboard,
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [language, setLanguage] = useState('en')
  const [userRole, setUserRole] = useState(null)

  // Beneficiary information store करण्यासाठी
  const [userData, setUserData] = useState(null)

  const handleNavigate = (page) => {
    // Assessment आणि Recommendations साठी login आवश्यक
    if (
      ['assessment', 'recommendations'].includes(page) &&
      userRole !== 'beneficiary'
    ) {
      setCurrentPage('home')
      return
    }

    // Dashboard फक्त Officer साठी
    if (page === 'dashboard' && userRole !== 'officer') {
      setCurrentPage('home')
      return
    }

    setCurrentPage(page)
  }

  const handleLogin = (role) => {
    setUserRole(role)

    // Officer → Dashboard
    if (role === 'officer') {
      setCurrentPage('dashboard')
    }

    // Beneficiary → Assessment
    if (role === 'beneficiary') {
      setCurrentPage('assessment')
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setUserData(null)
    setCurrentPage('home')
  }

  const Page = PAGES[currentPage]

  return (
    <div className="app-shell">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="app-main">
        <Page
          language={language}
          setLanguage={setLanguage}
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          userRole={userRole}
          userData={userData}
          setUserData={setUserData}
          onLogout={handleLogout}
        />
      </main>

      <footer className="app-footer">
        PM-AJAY Saathi · AI Livelihood and Skill Recommendation Assistant
      </footer>
    </div>
  )
}

export default App