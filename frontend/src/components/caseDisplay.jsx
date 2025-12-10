/**
 * @fileoverview Case Display Component
 * This component fetches and displays a list of cases from the API.
 * It shows case title, priority, and status in a formatted list.
 */

import { useState, useEffect } from "react";

// API endpoint for fetching cases
const endpoint = "http://localhost:3000/api/v1/cases/";

/**
 * CaseDisplay Component
 * 
 * Displays a list of all cases retrieved from the API.
 * Shows loading state while fetching and error messages if the request fails.
 * 
 * @returns {JSX.Element} The rendered case list component
 */
export function CaseDisplay() {
  // State to store the list of cases
  const [cases, setCases] = useState([]);
  
  // State to track loading status
  const [loading, setLoading] = useState(false);
  
  // State to store any error messages
  const [error, setError] = useState(null);

  /**
   * Effect hook to fetch cases on component mount
   * Runs once when the component is first rendered
   */
  useEffect(() => {
    /**
     * Fetches all cases from the API
     * Updates the cases state on success or error state on failure
     */
    const fetchCases = async () => {
      setLoading(true);
      try {
        // Fetch cases from the API endpoint
        const response = await fetch(endpoint);
        const result = await response.json();
        
        // Update cases state if the request was successful
        if (result.success) {
          setCases(result.data);
        }
      } catch (error) {
        // Store error message if the request fails
        setError('Error: ' + error.message);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    }
    
    // Execute the fetch function
    fetchCases();
  }, [])

  // Show loading message while data is being fetched
  if (loading) return <div>Loading cases...</div>;
  
  // Show error message if an error occurred
  if (error) return <div>Error: {error}</div>;

  // Render the list of cases
  return (
    <div>
      <ul>
        {/* Map through each case and render a list item */}
        {cases.map((caseItem) => (
          <li key={caseItem.id}>
            {/* Display case title in bold */}
            <b className="caseTitle">{caseItem.title}</b> - <i className="casePriority">Priority:</i> {caseItem.priority} - <i className="caseStatus">Status:</i> {caseItem.status}
          </li>
        ))}
      </ul>
    </div>
  )
};

    