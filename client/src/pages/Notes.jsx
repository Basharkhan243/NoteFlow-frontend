import { useState, useEffect } from "react";
import {
  FiSun,
  FiMoon,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiLogOut,
  FiFeather,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function NotesPage({ darkMode, toggleDarkMode }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    isPublic: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const backgroundStyle = darkMode
    ? { background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }
    : { background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)" };

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.data || []);
    } catch (err) {
      console.error("Notes API Error:", err.message);
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchNotes();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await api.put(`/notes/${editingId}`, newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedNote = res.data.data || res.data;
        setNotes(notes.map((n) => (n._id === editingId ? updatedNote : n)));
      } else {
        res = await api.post("/api/v1/notes/createnote", newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const createdNote = res.data.data || res.data;
        setNotes([...notes, createdNote]);
      }
      setNewNote({ title: "", content: "", isPublic: false });
      setEditingId(null);
    } catch (err) {
      console.error("Note submit error:", err.message);
      alert("Failed to save note.");
    }
  };

  const handleEdit = (note) => {
    setNewNote({
      title: note.title,
      content: note.content,
      isPublic: note.isPublic,
    });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Note delete error:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!searchTerm.trim()) return setSuggestions([]);
    const matched = notes
      .filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((n) => n.title);
    setSuggestions([...new Set(matched)].slice(0, 5));
  }, [searchTerm, notes]);

  return (
    <div className="min-h-screen w-full transition-colors duration-500 overflow-hidden" style={backgroundStyle}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ backgroundColor: "#ddd6fe" }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" style={{ backgroundColor: "#fef08a" }} />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500" style={{ backgroundColor: "#fbcfe8" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <Link to="/" className={`p-2 rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"}`}>
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
              <FiFeather className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
            </div>
            <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>NoteFlow</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-64 px-4 py-2 rounded-full border transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"}`}
            />
            <FiSearch className={`absolute right-3 top-2.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute mt-2 w-full rounded-xl shadow-2xl z-50 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  {suggestions.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`p-3 cursor-pointer border-b last:border-b-0 ${darkMode ? "border-gray-700 hover:bg-gray-700 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-900"}`} onClick={() => setSearchTerm(s)}>
                      {s}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button onClick={toggleDarkMode} className={`p-3 rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100 shadow-md"}`}>
            {darkMode ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-gray-700" />}
          </motion.button>

          <motion.button onClick={handleLogout} className={`px-6 py-2 rounded-full font-medium transition-all ${darkMode ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-500 hover:bg-red-600 text-white shadow-md"}`}>
            <FiLogOut className="inline mr-2" />
            Logout
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`rounded-2xl p-8 ${darkMode ? "bg-gray-800 shadow-2xl" : "bg-white shadow-2xl"}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Your Notes</motion.h1>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{editingId ? "Editing note..." : "Create and manage your thoughts"}</p>
            </div>

            {/* Note Form */}
            <motion.form onSubmit={handleSubmit} className="mb-8 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <input type="text" name="title" placeholder="Note title..." value={newNote.title} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"}`} required />
              <textarea name="content" placeholder="Write your thoughts here..." value={newNote.content} onChange={handleInputChange} rows="4" className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"}`} required />
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" name="isPublic" checked={newNote.isPublic} onChange={handleInputChange} className="mr-2 w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Make Public</span>
                </label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${darkMode ? "bg-purple-600 hover:bg-purple-500" : "bg-purple-500 hover:bg-purple-600"} shadow-lg`}>
                  <span className="flex items-center gap-2">{editingId ? "Update Note" : "Create Note"} <FiPlus className="w-4 h-4" /></span>
                </motion.button>
              </div>
            </motion.form>

            {/* Notes List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-600 mt-2"}>Loading your notes...</p>
                </div>
              ) : filteredNotes.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <FiFeather className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{searchTerm ? "No notes match your search." : "No notes yet. Create your first note!"}</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {filteredNotes.map((note, index) => (
                    <motion.div key={note._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-xl transition-all duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{note.title}</h3>
                        <div className="flex gap-2">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(note)} className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-500 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}>
                            <FiEdit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(note._id)} className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-100 text-red-500"}`}>
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{note.content}</p>
                      {note.isPublic && (
                        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Public</motion.span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

