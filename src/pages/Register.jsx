import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For success or error messages

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { name, username, email, password } = formData;
    if (!name || !username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData);

      if (res.data?.user) {
        setMessage("✅ Registration successful! You can now log in.");
        // Clear form
        setFormData({ name: "", username: "", email: "", password: "" });
      } else {
        setMessage("Registration failed!");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed!");
      console.error("Registration error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>

        {message && (
          <p className={`mb-4 text-center ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}