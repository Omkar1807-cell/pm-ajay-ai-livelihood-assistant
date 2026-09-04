import { useState } from 'react'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BeneficiaryLogin from './pages/BeneficiaryLogin.jsx'
import OTPVerification from './pages/OTPVerification.jsx'
import OfficerLogin from './pages/OfficerLogin.jsx'
import MyProfile from './pages/MyProfile.jsx'
import EducationSkills from './pages/EducationSkills.jsx'
import InterestsGoals from './pages/InterestsGoals.jsx'
import TrainingJourney from './pages/TrainingJourney.jsx'

import './App.css'

const PAGES = {
  home: Home,
  beneficiaryLogin: BeneficiaryLogin,
  otpVerification: OTPVerification,
  officerLogin: OfficerLogin,

  assessment: Assessment,
  recommendations: Recommendations,
  trainingJourney: TrainingJourney,

  dashboard: Dashboard,

  myProfile: MyProfile,
  educationSkills: EducationSkills,
  interestsGoals: InterestsGoals,
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [language, setLanguage] = useState('en')
  const [userRole, setUserRole] = useState(null)

  const [userData, setUserData] = useState({
    name: 'User Name',
    beneficiaryId: 'PM00125',
    mobile: '',
    location: 'Pune, Maharashtra',

    education: {
      highestQualification: '',
      fieldOfStudy: '',
      skills: [],
      workExperience: '',
    },

    interestsGoals: {
      interests: [],
      careerGoal: '',
    },
  })

  const handleNavigate = (page) => {
    // Login नसल्यास protected pages बंद
    if (
      [
        'assessment',
        'recommendations',
        'trainingJourney',
        'myProfile',
        'educationSkills',
        'interestsGoals',
        'dashboard',
      ].includes(page) &&
      !userRole
    ) {
      setCurrentPage('home')
      return
    }

    // Dashboard फक्त Officer साठी
    if (page === 'dashboard' && userRole !== 'officer') {
      setCurrentPage('home')
      return
    }

    // Beneficiary pages फक्त beneficiary साठी
    if (
      [
        'assessment',
        'recommendations',
        'trainingJourney',
        'myProfile',
        'educationSkills',
        'interestsGoals',
      ].includes(page) &&
      userRole !== 'beneficiary'
    ) {
      setCurrentPage('home')
      return
    }

    setCurrentPage(page)
  }

  const handleLogin = (role) => {
    setUserRole(role)

    if (role === 'officer') {
      setCurrentPage('dashboard')
    } else {
      setCurrentPage('assessment')
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setCurrentPage('home')
  }

  const Page = PAGES[currentPage]

  return (
    <div className="app-shell">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        setLanguage={setLanguage}
        userRole={userRole}
        userData={userData}
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