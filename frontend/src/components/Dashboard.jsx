import { useEffect, useState } from 'react'
import { CaseDisplay } from './caseDisplay'
import { PutCaseById } from './PutCaseById.jsx'
import { CreateCase } from './createCase.jsx'
import { CaseDelete } from './caseDelete.jsx'

/**
 * Dashboard Component - Main system overview and control center
 * 
 * This is the home page that displays:
 * - System statistics (total cases, active cases)
 * - Grid layout with all CRUD operations (Create, Read, Update, Delete)
 * 
 * The dashboard fetches data from the API and updates stats in real-time
 */
export default function Dashboard() {
  // State for system statistics
  const [stats, setStats] = useState({ total: 0, active: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetch statistics on component mount
   * Counts total cases and active cases (status: "open" OR "in progress")
   * This data is used to display in the stats bar at the top of the dashboard
   */
  useEffect(() => {
    const baseUrl = 'http://localhost:3000/api/v1/cases'
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(baseUrl)
        const json = await res.json().catch(() => ({}))
        // Handle both array and object with data property responses
        const items = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : [])
        const total = items.length
        // Count active cases: open or in progress
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
      {/* Statistics bar showing system overview */}
      <div className="stats-bar">
        {/* Total number of all cases in the system */}
        <div className="stat-card">
          <div className="stat-title">Total Cases</div>
          <div className="stat-value">{loading ? '—' : stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Cases</div>
          <div className="stat-value">{loading ? '—' : stats.total}</div>
        </div>
        {/* Number of active cases (open or in progress) */}
        <div className="stat-card">
          <div className="stat-title">Active Cases Now</div>
          <div className="stat-value">{loading ? '—' : stats.active}</div>
        </div>
      </div>

      {/* Grid layout with 5 main CRUD operation sections */}
      <div className="dashboard-grid">
        {/* Overview section - Display all cases with filtering and sorting */}
        <section>
          <h2>Overview of Cases</h2>
          <CaseDisplay />
        </section>

        {/* Update section - Edit existing case by ID or from search results */}
        <section>
          <h2>Case Detail</h2>
          <PutCaseById />
        </section>

        {/* Create section - Form to create a new support case */}
        <section>
          <h2>Create New Case</h2>
          <CreateCase />
        </section>

        {/* Delete section - Remove case from system */}
        <section>
          <h2>Delete Case</h2>
          <CaseDelete />
        </section>
      </div>
    </>
  )
}
