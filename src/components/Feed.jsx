// src/components/Feed.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import Post from "./Post";
import PostForm from "./PostForm";
import ErrorBoundary from "./ErrorBoundary.jsx";

function FeedContent() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts with token
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found – user might not be logged in");
        return;
      }

      const res = await API.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add new post at the top
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <PostForm onPostCreated={handlePostCreated} />
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts yet!</p>
      )}
    </div>
  );
}

export default function Feed() {
  return (
    <ErrorBoundary>
      <FeedContent />
    </ErrorBoundary>
  );
}