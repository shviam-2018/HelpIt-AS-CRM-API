import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

/**
 * CaseSearch Component - Search and display case details by ID
 * 
 * Features:
 * - Input field to search for case by ID
 * - Auto-fetch case data as user types
 * - Display formatted case details with labels
 * - Error handling for not found or invalid IDs
 */
export default function CaseSearch() {
    // Search state
    const [caseId, setCaseId] = useState("");
    
    // Data state
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch case data by ID
     * Runs automatically when caseId changes
     * Uses AbortController to cancel previous requests if user types again
     */
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
                // Fetch case by ID from API
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
        // Cleanup: abort request if component unmounts or caseId changes
        return () => controller.abort();
    }, [caseId]);

    return (
        <div className="case-edit-wrapper">
            <div className="case-edit-card">
                {/* Header section */}
                <div className="case-edit-header">
                    <div>
                        <h3>Search Case</h3>
                        <p className="muted">Enter a case ID to search.</p>
                    </div>
                </div>
                
                {/* Search input form */}
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

                {/* Error message display */}
                {error && <p className="error-message">Error: {error}</p>}
                
                {/* Case details display - formatted with labels */}
                {caseData && (
                    <div style={{ marginTop: '1rem' }}>
                        <h4 style={{ margin: '0 0 1rem 0' }}>Case Details</h4>
                        <div className="case-details-grid">
                            {/* Case ID */}
                            <div className="detail-row">
                                <span className="detail-label">ID:</span>
                                <span className="detail-value">{caseData?.id}</span>
                            </div>

                            {/* Case Number */}
                            <div className="detail-row">
                                <span className="detail-label">Case #:</span>
                                <span className="detail-value">{caseData?.caseNumber || '—'}</span>
                            </div>

                            {/* Title */}
                            <div className="detail-row">
                                <span className="detail-label">Title:</span>
                                <span className="detail-value">{caseData?.title || '—'}</span>
                            </div>

                            {/* Status */}
                            <div className="detail-row">
                                <span className="detail-label">Status:</span>
                                <span className="detail-value">{caseData?.status || '—'}</span>
                            </div>

                            {/* Priority */}
                            <div className="detail-row">
                                <span className="detail-label">Priority:</span>
                                <span className="detail-value">{caseData?.priority || '—'}</span>
                            </div>

                            {/* Owner */}
                            <div className="detail-row">
                                <span className="detail-label">Owner:</span>
                                <span className="detail-value">{caseData?.owner || '—'}</span>
                            </div>

                            {/* Customer */}
                            <div className="detail-row">
                                <span className="detail-label">Customer:</span>
                                <span className="detail-value">{caseData?.customer || '—'}</span>
                            </div>

                            {/* Date */}
                            <div className="detail-row">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">{caseData?.date || '—'}</span>
                            </div>

                            {/* Description - full width */}
                            <div className="detail-row detail-full">
                                <span className="detail-label">Description:</span>
                                <span className="detail-value">{caseData?.description || '—'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}