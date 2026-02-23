import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      if (!user) return;

      try {
        const res = await API.get("/notifications");

        // Ensure we always have an array
        const notificationsArray = Array.isArray(res.data)
          ? res.data
          : res.data.notifications || [];

        const unread = notificationsArray.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setUnreadCount(0); // fallback
      }
    };

    fetchUnread();
  }, [user]);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <Link to="/feed" className="font-bold text-xl">
        SocialApp
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to={`/profile/${user._id}`} className="hover:underline">
              Profile
            </Link>
            <Link to="/friends" className="hover:underline">
              Friends
            </Link>
            <Link to="/notifications" className="relative hover:underline">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <button
              onClick={logoutUser}
              className="bg-white text-blue-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}