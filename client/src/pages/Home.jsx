import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Add this import
import {
  FiSun,
  FiMoon,
  FiFeather,
  FiLock,
  FiShare2,
  FiSearch,
  FiZap,
} from "react-icons/fi";

export default function Homepage({ darkMode, toggleDarkMode }) {
  // Accept props from App.jsx
  // Remove internal state since it's controlled by parent
  // const [darkMode, setDarkMode] = useState(false);
  // const toggleDarkMode = () => { setDarkMode(!darkMode); };

  const floatingNotes = [
    { id: 1, text: "Meeting Notes", top: "20%", left: "10%", rotation: -5 },
    { id: 2, text: "Ideas", top: "60%", left: "15%", rotation: 3 },
    { id: 3, text: "To-Do List", top: "20%", right: "10%", rotation: 4 },
    { id: 4, text: "Project Plan", top: "60%", right: "15%", rotation: -3 },
  ];

  const features = [
    { icon: FiLock, title: "Secure", description: "End-to-end encryption" },
    {
      icon: FiShare2,
      title: "Collaborate",
      description: "Share notes instantly",
    },
    {
      icon: FiSearch,
      title: "Smart Search",
      description: "Find anything quickly",
    },
    { icon: FiZap, title: "Fast", description: "Lightning fast performance" },
  ];

  // Background style
  const backgroundStyle = darkMode
    ? { background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }
    : { background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)" };

  const gradientTextStyle = {
    background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500 overflow-hidden"
      style={backgroundStyle}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ backgroundColor: "#ddd6fe" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"
          style={{ backgroundColor: "#fef08a" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"
          style={{ backgroundColor: "#fbcfe8" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
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
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <FiMoon className="w-5 h-5 text-white" />
            )}
          </motion.button>

          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to="/login"
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  darkMode
                    ? "text-white hover:text-gray-200 border border-gray-600 hover:border-gray-400"
                    : "text-white bg-gray-400 hover:text-gray-900 border border-gray-300 hover:border-gray-500"
                }`}
              >
                Login
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/signup"
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-white transition-all ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-500"
                    : "bg-purple-500 hover:bg-purple-600 shadow-md"
                }`}
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Write, Organize,
                <span className="block mb-6 p-4" style={gradientTextStyle}>
                  Create Magic
                </span>
              </motion.h1>

              <motion.p
                className={`text-lg sm:text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                The intelligent note-taking app that helps you capture ideas,
                organize thoughts, and unleash your creativity. Secure, fast,
                and beautifully designed.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-full font-semibold text-lg text-white transition-all ${
                    darkMode
                      ? "bg-purple-600 hover:bg-purple-500 shadow-lg"
                      : "bg-purple-500 hover:bg-purple-600 shadow-lg"
                  }`}
                >
                  Start Writing Now
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Animated Notes */}
            <motion.div
              className="relative h-96 lg:h-[500px] w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {floatingNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className={`absolute w-32 h-40 rounded-lg shadow-2xl p-4 ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                  style={{
                    top: note.top,
                    left: note.left,
                    right: note.right,
                    rotate: note.rotation,
                  }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: 1,
                  }}
                  transition={{
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.5, delay: index * 0.2 },
                  }}
                >
                  <div
                    className={`h-2 w-8 rounded-full mb-3 ${
                      darkMode ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1 w-full rounded-full mb-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`h-1 w-3/4 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <p
                    className={`text-sm mt-3 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {note.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <feature.icon
                  className={`w-8 h-8 mb-4 ${
                    darkMode ? "text-purple-400" : "text-purple-500"
                  }`}
                />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8">
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Made with ❤️ for productive minds
        </p>
      </footer>
    </div>
  );
}

