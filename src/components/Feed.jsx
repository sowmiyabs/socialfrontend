import { useEffect, useState } from "react";
import API from "../api/axios";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts"); // <- your backend route
        console.log("Fetched posts:", res.data); // DEBUG
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  if (!posts.length)
    return <p className="text-center mt-10 text-gray-500">No posts yet!</p>;

  return (
    <div className="space-y-4 p-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

