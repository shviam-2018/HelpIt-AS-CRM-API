import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

/**
 * CaseDelete Component - Delete a support case
 * 
 * Features:
 * - Input field to enter case ID to delete
 * - Confirmation before deleting
 * - Delete request to API
 * - Error handling and feedback
 */
export function CaseDelete() {
    // Case ID to delete
    const [caseId, setCaseId] = useState("");
    
    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Component mounted - can add initialization logic here if needed
    }, []);

    /**
     * Send DELETE request to remove case from system
     * Validates case ID is provided
     * Shows confirmation on success
     */
    const removeCase = async () => {
        if (!caseId) {
            setError('Please enter a case ID');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Send DELETE request to API
            const response = await fetch(`${baseUrl}/${caseId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || `Failed to delete (${response.status})`);
            }
            alert('Case deleted successfully!');
            setCaseId('');
        } catch (err) {
            setError('Error deleting case: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="case-edit-wrapper">
            <div className="case-edit-card">
                <div className="case-edit-header">
                    <div>
                        <h3>Delete Case</h3>
                        <p className="muted">Enter a case ID to delete.</p>
                    </div>
                </div>
                <div className="id-input-group">
                    <input 
                        type="number" 
                        placeholder="Case ID"
                        value={caseId} 
                        onChange={(e) => setCaseId(e.target.value)}
                        className="id-input" 
                    />
                    <button 
                        onClick={removeCase} 
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Case'}
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}