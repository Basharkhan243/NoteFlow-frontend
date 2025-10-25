import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Home"; // Make sure this import is correct
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import Preloader from "./components/Preloader";
import ErrorBoundary from "./components/ErrorBoundary";
import Notes from "./pages/Notes";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <ErrorBoundary>
      {showPreloader ? (
        <Preloader darkMode={darkMode} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Homepage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/login"
            element={
              <Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/notes"
            element={
              <Notes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          {/* Add other routes here */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
