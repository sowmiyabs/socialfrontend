import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Feed from "./components/Feed";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/feed" />} />
          <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/feed" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
