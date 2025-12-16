import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import SearchBar from './components/SearchBar.jsx'
import HamburgerMenu from './components/HamburgerMenu.jsx'
import Dashboard from './components/Dashboard.jsx'
import { CaseDisplay } from './components/caseDisplay'
import { PutCaseById } from './components/PutCaseById.jsx'
import { CreateCase } from './components/createCase.jsx'
import { CaseDelete } from './components/caseDelete.jsx'
import CaseSearch from './components/caseSearch.jsx'
import './App.css'

/**
 * App Component - Main application root
 * Manages routing for all pages and overall layout structure
 * Layout: Sidebar + Main Content (SearchBar + HamburgerMenu + Routes)
 */
function App() {
  return (
    <div className="app-layout">
      {/* Left sidebar with navigation links */}
      <Sidebar />
      
      <div className="main-content">
        {/* Top navigation bar with search and mobile menu */}
        <div className="top-bar">
          <SearchBar />
          <HamburgerMenu />
        </div>
        
        {/* Main content area with all routes */}
        <main className="content">
          <Routes>
            {/* Dashboard - Overview with stats and all operations */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Individual page routes */}
            <Route path="/create" element={<CreateCase />} />
            <Route path="/search" element={<CaseSearch />} />
            <Route path="/display" element={<CaseDisplay />} />
            
            {/* Update case - supports direct navigation with case ID */}
            <Route path="/update" element={<PutCaseById />} />
            <Route path="/update/:id" element={<PutCaseById />} />
            
            <Route path="/delete" element={<CaseDelete />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
