// src/pages/Friends.jsx
import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Friends() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all friend data
  const fetchFriends = async () => {
    if (!user?._id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/users/me");
      const data = res.data.user;
      setFriends(Array.isArray(data.friends) ? data.friends : []);
      setReceivedRequests(Array.isArray(data.friendRequests?.received) ? data.friendRequests.received : []);
      setSentRequests(Array.isArray(data.friendRequests?.sent) ? data.friendRequests.sent : []);
    } catch (err) {
      console.error("Error fetching friends:", err);
      setError(err.response?.data?.message || "Failed to fetch friends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [user]);

  // Friend actions
  const acceptRequest = async (id) => {
    try {
      const res = await API.post(`/users/friends/accept/${id}`);
      setFriends((prev) => [...prev, res.data.newFriend]);
      setReceivedRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  const declineRequest = async (id) => {
    try {
      await API.post(`/users/friends/decline/${id}`);
      setReceivedRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  const cancelRequest = async (id) => {
    try {
      await API.post(`/users/friends/cancel/${id}`);
      setSentRequests((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  const removeFriend = async (id) => {
    if (!window.confirm("Remove this friend?")) return;
    try {
      await API.delete(`/users/friends/${id}`);
      setFriends((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-xl mx-auto bg-red-100 text-red-800 rounded shadow">
        <p className="mb-2">{error}</p>
        <button onClick={fetchFriends} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Received Requests */}
      <section>
        <h2 className="text-xl font-bold mb-3">Friend Requests</h2>
        {receivedRequests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          receivedRequests.map((r) => (
            <div key={r._id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
              <Link to={`/profile/${r._id}`} className="font-medium hover:underline">{r.name || r.username}</Link>
              <div className="space-x-2">
                <button onClick={() => acceptRequest(r._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Accept</button>
                <button onClick={() => declineRequest(r._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Decline</button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Sent Requests */}
      <section>
        <h2 className="text-xl font-bold mb-3">Sent Requests</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-500">No sent requests</p>
        ) : (
          sentRequests.map((s) => (
            <div key={s._id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
              <Link to={`/profile/${s._id}`} className="font-medium hover:underline">{s.name || s.username}</Link>
              <button onClick={() => cancelRequest(s._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Cancel</button>
            </div>
          ))
        )}
      </section>

      {/* Friends List */}
      <section>
        <h2 className="text-xl font-bold mb-3">Friends</h2>
        {friends.length === 0 ? (
          <p className="text-gray-500">No friends yet</p>
        ) : (
          friends.map((f) => (
            <div key={f._id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
              <Link to={`/profile/${f._id}`} className="font-medium hover:underline">{f.name || f.username}</Link>
              <button onClick={() => removeFriend(f._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Remove</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}