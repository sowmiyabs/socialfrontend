import { useState } from "react";
import API from "../api/axios";

export default function PostForm({ onPostCreated }) {
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && mediaFiles.length === 0) return;

    const formData = new FormData();
    formData.append("text", text);
    mediaFiles.forEach((file) => formData.append("media", file));

    try {
      setLoading(true);
      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPostCreated(res.data); // Add new post to feed
      setText("");
      setMediaFiles([]);
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-6"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      <input
        type="file"
        multiple
        onChange={(e) => setMediaFiles(Array.from(e.target.files))}
        className="mb-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
