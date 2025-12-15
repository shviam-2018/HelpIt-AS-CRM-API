import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

export default function CaseSearch() {
    const [caseId, setCaseId] = useState("");
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!caseId) {
            setCaseData(null);
            setError(null);
            return;
        }

        const controller = new AbortController();

        const fetchCase = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${baseUrl}/${encodeURIComponent(caseId)}` , { signal: controller.signal });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result?.message || `Request failed (${response.status})`);
                }
                setCaseData(result?.data ?? result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setCaseData(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCase();
        return () => controller.abort();
    }, [caseId]);

    return (
        <div className="case-edit-wrapper">
            <div className="case-edit-card">
                <div className="case-edit-header">
                    <div>
                        <h3>Search Case</h3>
                        <p className="muted">Enter a case ID to search.</p>
                    </div>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="id-input-group">
                        <input
                            type="text"
                            placeholder="Enter Case ID"
                            value={caseId}
                            onChange={(e) => setCaseId(e.target.value)}
                            className="id-input"
                        />
                        <button type="button" className="primary-button" disabled={loading}>
                            {loading ? "Searching…" : "Search"}
                        </button>
                    </div>
                </form>

                {error && <p className="error-message">Error: {error}</p>}
                {caseData && (
                    <div style={{ marginTop: '1rem' }}>
                        <h4 style={{ margin: '0 0 0.75rem 0' }}>Case Details</h4>
                        <pre style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: 8, overflow: 'auto', fontSize: '0.9rem' }}>
                            {JSON.stringify(caseData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}