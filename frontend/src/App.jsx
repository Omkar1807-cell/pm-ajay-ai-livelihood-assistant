import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

const PAGES = {
  home: Home,
  assessment: Assessment,
  recommendations: Recommendations,
  dashboard: Dashboard,
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [language, setLanguage] = useState('en')

  const Page = PAGES[currentPage]

  return (
    <div className="app-shell">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        language={language}
      />

      <main className="app-main">
        <Page
          language={language}
          setLanguage={setLanguage}
          onNavigate={setCurrentPage}
        />
      </main>

      <footer className="app-footer">
        PM-AJAY Saathi · AI livelihood and skill recommendation assistant
      </footer>
    </div>
  )
}

export default App