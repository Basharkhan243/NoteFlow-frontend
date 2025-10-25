// TestNotes.jsx - Create this component to test your notes functionality
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function TestNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    testNotesAPI();
  }, []);

  const testNotesAPI = async () => {
    try {
      setDebugInfo("Starting API test...");
      
      // Check if token exists
      const token = localStorage.getItem('token');
      setDebugInfo(prev => prev + `\nToken exists: ${!!token}`);
      setDebugInfo(prev => prev + `\nToken length: ${token?.length}`);

      if (!token) {
        setError("No token found - redirecting to login");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      // Test the notes API endpoint
      setDebugInfo(prev => prev + `\nMaking API call to /notes...`);
      
      const response = await api.get("/notes");
      
      setDebugInfo(prev => prev + `\nAPI Response status: ${response.status}`);
      setDebugInfo(prev => prev + `\nAPI Response data: ${JSON.stringify(response.data).substring(0, 200)}...`);
      
      setNotes(response.data.notes || response.data);
      setLoading(false);
      
    } catch (err) {
      console.error("Notes API Error:", err);
      setDebugInfo(prev => prev + `\nError occurred: ${err.message}`);
      setDebugInfo(prev => prev + `\nError response: ${JSON.stringify(err.response?.data)}`);
      
      if (err.response?.status === 401) {
        setError("Unauthorized - Token expired or invalid");
        localStorage.removeItem('token');
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.status === 500) {
        setError("Server error - Backend issue");
      } else {
        setError(`API Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  const clearTokenAndTest = () => {
    localStorage.removeItem('token');
    setDebugInfo(prev => prev + `\nToken cleared`);
  };

  const reloadTest = () => {
    setLoading(true);
    setError(null);
    testNotesAPI();
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Notes API</h1>
        <div className="p-4 bg-blue-100 rounded-lg">
          <pre>{debugInfo}</pre>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notes API Test Results</h1>
      
      <div className="mb-4 space-x-4">
        <button 
          onClick={reloadTest}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry Test
        </button>
        <button 
          onClick={clearTokenAndTest}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear Token
        </button>
        <button 
          onClick={() => navigate('/notes')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to Real Notes
        </button>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <pre className="whitespace-pre-wrap text-sm">{debugInfo}</pre>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="font-bold mb-2">Notes Data ({notes.length} notes):</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(notes, null, 2)}
        </pre>
      </div>
    </div>
  );
}
