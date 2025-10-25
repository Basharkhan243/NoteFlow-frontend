import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiFeather, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function SignupPage({ darkMode, toggleDarkMode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // ✅ Fixed: removed /api/v1 prefix and extra config
      const response = await api.post("/users/signup", { 
        name, 
        email, 
        password 
      });
      
      console.log('Signup response:', response.data);
      
      navigate("/login", { state: { from: "signup", email } });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = darkMode
    ? { background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }
    : { background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)" };

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors duration-500"
      style={backgroundStyle}
    >
      {/* Preloader */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{
          ...backgroundStyle,
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        <div className="absolute inset-0 overflow-hidden w-10">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ backgroundColor: "#ddd6fe" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"
            style={{ backgroundColor: "#fef08a" }}
          />
          <div
            className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"
            style={{ backgroundColor: "#fbcfe8" }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`p-6 rounded-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-2xl mb-6`}
          >
            <FiFeather
              className={`w-16 h-16 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
          </motion.div>

          <motion.h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            NoteFlow
          </motion.h1>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col flex-1"
      >
        {/* Navbar */}
        <nav className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleBackToHome}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"
              }`}
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white shadow-md"
                }`}
              >
                <FiFeather
                  className={`w-6 h-6 ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </div>
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                NoteFlow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100 shadow-md"
              }`}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>

            <Link
              to="/login"
              className={`text-lg font-medium transition-all border-b border-transparent hover:border-current ${
                darkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Signup Form */}
        <main className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-opacity-40 border ${
              darkMode
                ? "bg-gray-800/60 border-gray-700 shadow-2xl"
                : "bg-white/70 border-gray-200 shadow-xl"
            }`}
          >
            <div className="text-center mb-8">
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Create Account
              </h1>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Join our NoteFlow community
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center p-3 rounded-lg bg-red-50 border border-red-200">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  }`}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  }`}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  }`}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  }`}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-500"
                    : "bg-purple-500 hover:bg-purple-600"
                } shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </motion.button>

              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className={`font-semibold transition-colors ${
                      darkMode
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-purple-600 hover:text-purple-700"
                    }`}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
