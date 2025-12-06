import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

export function PutCaseById() {
  const [caseId, setCaseId] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [caseStatus, setCaseStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [caseNumber, setCaseNumber] = useState("");

  useEffect(() => {
    if (!caseId) return;

    const fetchCaseById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/${caseId}`);
        const result = await response.json();
        if (result.success) {
          const caseItem = result.data;
          setCaseData(caseItem);
          setCaseStatus(caseItem.status || "");
          setPriority(caseItem.priority || "");
          setOwner(caseItem.owner || "");
          setDescription(caseItem.description || "");
          setTitle(caseItem.title || "");
          setDate(caseItem.date || "");
          setCustomer(caseItem.customer || "");
          setCaseNumber(caseItem.caseNumber || "");
        } else {
          setError("Failed to fetch case");
        }
      } catch (err) {
        setError('Error fetching case: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseById();
  }, [caseId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!caseId) {
      setError('Please provide an ID to update');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const body = {
        status: caseStatus,
        priority,
        owner,
        description,
        title,
        date,
        customer,
        caseNumber,
      };
      const res = await fetch(`${baseUrl}/${caseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Failed to update (${res.status})`);
      }
      const updated = data?.data ?? data;
      setCaseData(updated);
      setSuccessMessage('Case updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="case-edit-wrapper">
      <div className="case-edit-card">
        <div className="case-edit-header">
          <div>
            <h3>Edit Case</h3>
            <p className="muted">Enter an ID, load the case, edit, then save.</p>
          </div>
          <div className="id-input-group">
            <input
              type="number"
              placeholder="Case ID"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="id-input"
            />
          </div>
        </div>

        {loading && <div>Loading case...</div>}
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {caseData ? (
          <form onSubmit={handleSubmit} className="case-edit-form">
            <div className="field-grid">
              <label className="field">
                <span>Case number</span>
                <input value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} />
              </label>
              <label className="field">
                <span>Title</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label className="field">
                <span>Status</span>
                <select value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}>
                  <option value="">Choose status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>
              <label className="field">
                <span>Priority</span>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="">Choose priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <label className="field">
                <span>Owner</span>
                <input value={owner} onChange={(e) => setOwner(e.target.value)} />
              </label>
              <label className="field">
                <span>Customer</span>
                <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
              </label>
              <label className="field">
                <span>Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label className="field field-full">
                <span>Description</span>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        ) : (
          !loading && <div className="empty-state">No case loaded. Enter ID and wait.</div>
        )}
      </div>
    </div>
  );
}