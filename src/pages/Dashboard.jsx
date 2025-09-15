import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import NoteCard from "../components/NoteCard";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // login user ka data
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  // fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.log("Error fetching notes", error);
    }
  };

  // create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // update note
        await API.put(`/notes/${editId}`, form);
        setEditId(null);
      } else {
        // create note
        await API.post("/notes", form);
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (error) {
      console.log("Error saving note", error);
    }
  };

  // delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log("Error deleting note", error);
    }
  };

  // edit note
  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="relative container mx-auto p-6 mt-15 ">
      
      {/* Top-left Logged-in User Name */}
      {user && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-4 left-1 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg shadow-md "
        >
          <p className="text-gray-900 font-semibold font-serif text-lg">
            Welcome, <span className="text-indigo-600 font-bold">{user.name}</span>!
          </p>
        </motion.div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center mt-9">My Notes Create</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 max-w-2xl ">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          rows="4"
          className="w-full border px-3 py-2 rounded"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", content: "" });
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* notes list */}
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
