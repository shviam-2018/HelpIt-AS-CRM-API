import { useState, useEffectEvent } from "react";

const baseUrl = "http://localhost:3000/api/v1/cases";

export function CaseSearch() {
    const [caseId, setCaseId] = useState("");
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaseById = async () => {
            if (!caseId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${baseUrl}/${caseId}`);
                const result = await response.json();
                if (result.success) {
                    setCaseData(result.data);
                    response.status(200).json({ success: true, data: result.data });
                }
            } catch (error) {
                setError('Error: ' + error.message);
                setCaseData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCaseById();
    }, [caseId]);

    return (pass);
}