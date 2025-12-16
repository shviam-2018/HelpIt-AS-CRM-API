import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3000/api/v1/cases";

/**
 * SearchBar Component - Global case search functionality
 * 
 * Features:
 * - Search cases by ID (direct lookup) or Case Number (filter all cases)
 * - Dropdown to switch between search types
 * - Clickable results that navigate to case update page
 * - Error handling and loading states
 * - Clear button to reset search
 */
export default function SearchBar() {
  const navigate = useNavigate();
  
  // Search input and state
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("caseNumber"); // "id" or "caseNumber"
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle search form submission
   * Supports two search modes:
   * - By ID: Direct API lookup of specific case
   * - By Case Number: Fetch all cases and filter by case number
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let url = baseUrl;
      
      if (searchType === "id") {
        // Direct ID lookup - fetch specific case
        url = `${baseUrl}/${encodeURIComponent(query)}`;
      } else {
        // Case number search - fetch all cases and filter
        const response = await fetch(url);
        const json = await response.json();
        // Handle both array and object with data property responses
        const items = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : []);
        // Filter cases by case number
        const filtered = items.filter(c => String(c?.caseNumber).includes(String(query)));
        setResults({
          query,
          type: searchType,
          data: filtered,
          count: filtered.length,
          timestamp: new Date().toLocaleTimeString(),
        });
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.message || `Not found`);
      }
      setResults({
        query,
        type: searchType,
        data: json?.data ?? json,
        count: 1,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear search input and results
   */
  const handleClear = () => {
    setQuery("");
    setResults(null);
    setError(null);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          {/* Search type selector - choose between ID or Case Number search */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type"
            title="Search by ID or Case Number"
          >
            <option value="caseNumber">Case #</option>
            <option value="id">ID</option>
          </select>
          
          {/* Search input field */}
          <input
            type="text"
            placeholder={searchType === "id" ? "Search by ID..." : "Search by case number..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          
          {/* Search button */}
          <button type="submit" className="search-button" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          
          {/* Clear button appears when user has typed something */}
          {query && (
            <button type="button" className="search-clear" onClick={handleClear} title="Clear">
              ✕
            </button>
          )}
        </form>

        {/* Error message display */}
        {error && <div className="search-error">{error}</div>}
        
        {/* Search results dropdown - shows matching cases */}
        {results && (
          <div className="search-results">
            {/* Results header showing count and search type */}
            <div className="search-results-header">
              Found {results.count} result{results.count !== 1 ? 's' : ''} ({results.type === 'id' ? 'ID' : 'Case Number'}: {results.query})
            </div>
            
            {/* Results list - each result is clickable and navigates to case */}
            {results.data && (
              <div className="search-results-list">
                {Array.isArray(results.data) ? (
                  results.data.map((item, idx) => (
                    // Each result is a clickable button that navigates to update page
                    <button
                      key={idx}
                      className="search-result-item"
                      onClick={() => navigate(`/update/${item?.id}`)}
                      type="button"
                    >
                      <strong>{item?.title || item?.caseNumber || 'Untitled'}</strong>
                      <span>{item?.status} • {item?.priority}</span>
                    </button>
                  ))
                ) : (
                  // Single result handling
                  <button
                    className="search-result-item"
                    onClick={() => navigate(`/update/${results.data?.id}`)}
                    type="button"
                  >
                    <strong>{results.data?.title || results.data?.caseNumber || 'Untitled'}</strong>
                    <span>{results.data?.status} • {results.data?.priority}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

