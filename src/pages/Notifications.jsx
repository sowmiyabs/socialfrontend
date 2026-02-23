// src/pages/Notifications.jsx
import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Notifications() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user?._id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/notifications");
      const data = res.data;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.response?.data?.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  if (!user?._id) {
    return <p className="p-4 text-center text-gray-500">Please log in to see notifications.</p>;
  }

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
        <button
          onClick={fetchNotifications}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="font-bold text-xl mb-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`border p-3 rounded shadow ${n.isRead ? "bg-white" : "bg-blue-50"}`}
          >
            <p>
              <strong>{n.from?.username || "Someone"}</strong>{" "}
              {n.type === "like" && "liked your post"}
              {n.type === "comment" && "commented on your post"}
              {n.type === "friend_request" && "sent you a friend request"}
            </p>
            <small className="text-gray-400 text-sm">
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}