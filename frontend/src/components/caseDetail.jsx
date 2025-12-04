import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

export function PutCaseById() {
  const [caseId, setCaseId] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!caseId) return;

    const fetchCaseById = async () => {
      setLoading(true);
      setError(null);
      try {
        
      } catch (error) {
        
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
      const body = { title, caseNumber, };
      const res = await fetch(`${baseUrl}/${caseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Failed to update (${res.status})`);
      }
      const updated = data?.data ?? data?.movie ?? data;
      setMovie(updated);
      setStatus('Oppdatert!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{border:'1px solid #ddd',padding:8,margin:8}}>
      <h3>Oppdater film (PUT)</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input
          type="number"
          placeholder="Film ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
      </div>

      {loading && <div>Laster film...</div>}
      {error && <div style={{color:'red'}}>Feil: {error}</div>}
      {status && <div style={{color:'green'}}>{status}</div>}

      {movie && (
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:360}}>
          <label>
            Tittel
            <input value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <label>
            Regissør
            <input value={director} onChange={e=>setDirector(e.target.value)} />
          </label>
          <label>
            År
            <input type="number" value={year} onChange={e=>setYear(e.target.value)} />
          </label>
          <div style={{display:'flex',gap:8}}>
            <button type="submit" disabled={saving}>{saving ? 'Lagrer...' : 'Oppdater film'}</button>
          </div>
        </form>
      )}

      {!movie && !loading && <div>Ingen film lastet. Skriv ID og vent.</div>}
    </div>
  );
}