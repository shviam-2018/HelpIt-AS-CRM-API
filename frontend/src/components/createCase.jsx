import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

export function CreateCase() {
  const [caseStatus, setCaseStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component mounted - can add initialization logic here if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Failed to create case (${res.status})`);
      }
      // Clear form on success
      setCaseStatus('');
      setPriority('');
      setOwner('');
      setDescription('');
      setTitle('');
      setDate('');
      setCustomer('');
      setCaseNumber('');
      alert('Case created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="case-edit-wrapper">
      <div className="case-edit-card">
        <div className="case-edit-header">
          <div>
            <h3>Create Case</h3>
            <p className="muted">Fill in the details, then save to create a new case.</p>
          </div>
        </div>

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
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Saving..." : "Create case"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}