// components/Preloader.jsx
import { motion } from "framer-motion";
import { FiFeather } from "react-icons/fi";

export default function Preloader({ darkMode, isLoading }) {
  const backgroundStyle = darkMode
    ? { background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }
    : { background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)" };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 0.8 : 0 }}
      transition={{ duration: 10.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        ...backgroundStyle,
        pointerEvents: isLoading ? "auto" : "none",
      }}
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

      {/* Animated Logo */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
            darkMode ? "text-white" : "text-gray-900"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          NoteFlow
        </motion.h1>

        <motion.div
          className="flex space-x-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className={`w-3 h-3 rounded-full ${
              darkMode ? "bg-purple-400" : "bg-purple-600"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className={`w-3 h-3 rounded-full ${
              darkMode ? "bg-purple-400" : "bg-purple-600"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className={`w-3 h-3 rounded-full ${
              darkMode ? "bg-purple-400" : "bg-purple-600"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
