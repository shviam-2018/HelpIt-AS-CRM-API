import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import { CaseDisplay } from './components/caseDisplay'
import { PutCaseById } from './components/PutCaseById.jsx'
import { CreateCase } from './components/createCase.jsx'
import { CaseDelete } from './components/caseDelete.jsx'
import CaseSearch from './components/caseSearch.jsx'
import './App.css'

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const baseUrl = 'http://localhost:3000/api/v1/cases'
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(baseUrl)
        const json = await res.json().catch(() => ({}))
        const items = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
        const total = items.length
        const active = items.filter(c => {
          const status = String(c?.status || '').toLowerCase()
          return status === 'open' || status === 'in progress'
        }).length
        setStats({ total, active })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-title">Total Cases</div>
          <div className="stat-value">{loading ? '—' : stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Cases</div>
          <div className="stat-value">{loading ? '—' : stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Cases Now</div>
          <div className="stat-value">{loading ? '—' : stats.active}</div>
        </div>
      </div>

      <div className="dashboard-grid">
      <section>
        <h2>Overview of Cases</h2>
        <CaseDisplay />
      </section>
      <section>
        <h2>Case Detail</h2>
        <PutCaseById />
      </section>
      <section>
        <h2>Create New Case</h2>
        <CreateCase />
      </section>
      <section>
        <h2>Search Case</h2>
        <CaseSearch />
      </section>
      <section>
        <h2>Delete Case</h2>
        <CaseDelete />
      </section>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateCase />} />
          <Route path="/search" element={<CaseSearch />} />
          <Route path="/display" element={<CaseDisplay />} />
          <Route path="/update" element={<PutCaseById />} />
          <Route path="/delete" element={<CaseDelete />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
