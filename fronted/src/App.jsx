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
  const Page = PAGES[currentPage] ?? Home

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-main">
        <Page onNavigate={setCurrentPage} />
      </main>
      <footer className="app-footer">
        <p>PM-AJAY Saathi · AI livelihood and skill recommendation assistant</p>
      </footer>
    </div>
  )
}

export default App
