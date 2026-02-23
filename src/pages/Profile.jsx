// src/pages/Profile.jsx
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Post from "../components/Post";

export default function Profile() {
  const { id } = useParams(); // userId from URL
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use id from URL, fallback to logged-in user
        const userId = id || user?._id;
        if (!userId) return;

        const res = await API.get(`/users/${userId}`);
        setProfile(res.data.user || null);
        setPosts(Array.isArray(res.data.posts) ? res.data.posts : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center mb-4 space-x-4">
        {profile.profilePicture && (
          <img
            src={profile.profilePicture}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          {profile.username && <p className="text-gray-500">@{profile.username}</p>}
          {profile.bio && <p className="text-gray-700 mt-1">{profile.bio}</p>}
        </div>
      </div>

      {/* User Posts */}
      <h2 className="text-xl font-bold mb-2">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500 italic">No posts yet</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}