import { useState, useEffect } from "react";
const endpoint = "http://localhost:3000/api/v1/cases/";

export function CaseDisplay() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        const result = await response.json();
        if (result.success) {
          setCases(result.data);
        }
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) return <div>Loading cases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="case-table-card">
      <h3 className="case-table-title">All Cases</h3>
      <ul className="case-table">
        {cases.map((caseItem) => (
          <li className="case-row" key={caseItem.id}>
            <strong className="caseTitle">{caseItem.title}</strong>
            <span><span className="casePriority">Priority:</span> {caseItem.priority}</span>
            <span><span className="caseStatus">Status:</span> {caseItem.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

    