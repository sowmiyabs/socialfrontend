import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Post from "../components/Post";

export default function Profile() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/users/${id}`);
      setProfile(res.data.user);
      setUserPosts(res.data.posts);
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p>@{profile.username}</p>
        <p>{profile.bio}</p>
      </div>
      <div className="space-y-4">
        {userPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
