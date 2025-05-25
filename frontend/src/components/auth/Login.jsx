import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Auth.css"
import { toast } from "react-toastify";
import api from "../../api/axios";

const Login = () => {
    const { fetchUserData } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("/users/login/", {
            //     email,
            //     password,
            // });
            const response = await api.post('/api/users/login/', {
                email,
                password,
            });

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            localStorage.setItem("token", accessToken);
            localStorage.setItem("refresh", refreshToken);

            await fetchUserData();
            setTimeout(() => {
                toast.success("Login successful!", {autoClose:3000});
            }, 100);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.error || "Login failed. Try again!");
            setTimeout(() => {
                toast.error("Login failed. Check your credentials.");
            }, 100);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2 className="auth-title">Welcome Back</h2>
                {error && <p className="auth-error">{error}</p>}
                
                <input 
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="Submit" className="auth-button">
                    Login
                </button>
                <p className="auth-switch">Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
        </div>
    );
};

export default Login;
