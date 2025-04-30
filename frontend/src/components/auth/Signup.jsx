import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Auth.css";
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const navigate = useNavigate();

    // const auth = getAuth(app);
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/users/signup/", {
                email,
                password,
            });
            navigate("/dashboard");
            setTimeout(() => {
                toast.success("Account created successfully!", { autoClose: 3000 });
            }), 100;
        } catch (err) {
            console.log("Signup Error:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Signup failed. Try again!");
            setTimeout(() => {
                toast.error("Signup failed. Try again.");
            }), 100;
        }
    };
    
    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSignup}>
                <h2 className="auth-title">Create Your Account</h2>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="auth-button">
                    Sign Up
                </button>
                <p className="auth-switch">Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    ); 
};

export default Signup;
