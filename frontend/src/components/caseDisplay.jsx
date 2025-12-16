import { useState, useEffect } from "react";
const endpoint = "http://localhost:3000/api/v1/cases/";

export function CaseDisplay() {
  // State for cases data
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for active filters
  const [filters, setFilters] = useState({
    status: "",
    customer: "",
    owner: "",
  });
  
  // State for available filter options (extracted from cases)
  const [uniqueValues, setUniqueValues] = useState({
    statuses: [],
    customers: [],
    owners: [],
  });

  /**
   * Fetch all cases from API on component mount
   * Extract unique values for filter dropdowns
   * Set initial filtered list to all cases
   */
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        const result = await response.json();
        if (result.success) {
          setCases(result.data);
          setFilteredCases(result.data);

          // Extract unique filter values from cases data
          const statuses = [...new Set(result.data.map(c => c?.status).filter(Boolean))];
          const customers = [...new Set(result.data.map(c => c?.customer).filter(Boolean))];
          const owners = [...new Set(result.data.map(c => c?.owner).filter(Boolean))];

          setUniqueValues({
            statuses: statuses.sort(),
            customers: customers.sort(),
            owners: owners.sort(),
          });
        }
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  /**
   * Apply filters to cases whenever filters or cases change
   * Filters are applied cumulatively (status AND customer AND owner)
   */
  useEffect(() => {
    // Start with all cases
    let filtered = cases;

    // Apply status filter if selected
    if (filters.status) {
      filtered = filtered.filter(c => c?.status === filters.status);
    }
    // Apply customer filter if selected
    if (filters.customer) {
      filtered = filtered.filter(c => c?.customer === filters.customer);
    }
    // Apply owner filter if selected
    if (filters.owner) {
      filtered = filtered.filter(c => c?.owner === filters.owner);
    }

    // Sort filtered cases by status (open first, then in progress, then closed)
    const statusOrder = { "open": 0, "in progress": 1, "closed": 2 };
    filtered.sort((a, b) => {
      const statusA = statusOrder[a?.status?.toLowerCase()] ?? 999;
      const statusB = statusOrder[b?.status?.toLowerCase()] ?? 999;
      return statusA - statusB;
    });

    setFilteredCases(filtered);
  }, [filters, cases]);

  /**
   * Handle filter dropdown changes
   * Updates the filter state with the selected value
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Reset all filters to show all cases again
   */
  const handleResetFilters = () => {
    setFilters({
      status: "",
      customer: "",
      owner: "",
    });
  };

  if (loading) return <div>Loading cases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="case-table-card">
      <h3 className="case-table-title">All Cases</h3>

      {/* Filter controls section */}
      <div className="filter-section">
        <div className="filter-controls">
          {/* Status filter - shows open, in progress, and closed cases separately */}
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            {uniqueValues.statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Customer filter - filter cases by customer name */}
          <select
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Customers</option>
            {uniqueValues.customers.map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>

          {/* Owner filter - filter cases by assigned owner/team member */}
          <select
            name="owner"
            value={filters.owner}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Owners</option>
            {uniqueValues.owners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>

          {/* Reset button appears only when filters are active */}
          {(filters.status || filters.customer || filters.owner) && (
            <button onClick={handleResetFilters} className="filter-reset">
              Reset Filters
            </button>
          )}
        </div>

        {/* Shows count of filtered cases vs total */}
        <div className="filter-info">
          Showing {filteredCases.length} of {cases.length} cases
        </div>
      </div>

      {/* Cases list - sorted by status (open → in progress → closed) */}
      <ul className="case-table">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseItem) => (
            <li className="case-row" key={caseItem.id}>
              <strong className="caseTitle">{caseItem.title}</strong>
              <span><span className="casePriority">Priority:</span> {caseItem.priority}</span>
              <span><span className="caseStatus">Status:</span> {caseItem.status}</span>
            </li>
          ))
        ) : (
          <li className="empty-row">No cases match your filters.</li>
        )}
      </ul>
    </div>
  );
}


    