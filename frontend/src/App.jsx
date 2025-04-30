import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/common/AppNavbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import Matches from "./pages/Matches.jsx";
import ProfileEdit from "./pages/ProfileEdit.jsx";
import NotFound from "./pages/NotFound.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <AppNavbar/>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} limit={3} closeOnClick pauseOnHover draggable theme="colored" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> :<Signup/>} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> :<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:uid" element={<ProfilePage />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;