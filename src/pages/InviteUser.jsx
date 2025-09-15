import { useState, useContext } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const InviteUser = () => {
  const { user } = useContext(AuthContext); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "member",
    password: "123456",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tenants/invite", form);
      alert("User invited successfully");
      setForm({ name: "", email: "", role: "member", password: "123456" });
    } catch (err) {
      alert("Failed to invite user");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center">

      {/* Top-left Welcome Message */}
      {user && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-23 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg shadow-md"
        >
          <p className="text-gray-900 font-semibold font-serif text-lg">
            Welcome, <span className="text-indigo-600 font-bold">{user.name}</span>!
          </p>
        </motion.div>
      )}

      {/* Center Invite Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Invite New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <select
            value={form.role}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="member">Member</option>
            <option value="editor">Editor</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Invite User
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default InviteUser;
