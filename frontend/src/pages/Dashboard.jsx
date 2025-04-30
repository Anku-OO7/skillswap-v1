import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [topMatches, setTopMatches] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        console.log("Dashboard loaded");
        
        const fetchMatches = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:8000/api/users/matches/", {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    },
                });
                
                const matches = response.data.matches || [];
                //sortby most commoon skills and pick top 3 for top matches
                const sortedMatches = [...matches].sort((a,b) => b.commonSkills.length - a.commonSkills.length);

                setTopMatches(sortedMatches.slice(0, 3));
                setAllMatches(matches);
            } catch (error) {
                console.error("Error fetching dashobard data:", error);
                setTimeout(() => {
                    toast.error("Unable to load dashboard data!");
                }, 100);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (loading) return <Loader />;
    //      {
    //     return <div className="dashboard-loading">Loading Dashboard...</div>;
    // }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header"> Welcome to SkillSwap, {user?.first_name || "Friend"}!</h1>

            <section className="top-matches-section">
                <h2>Top Skill Matches</h2>
                <div className="matches-grid">
                    {topMatches.length > 0 ? (
                        topMatches.map((match) => (
                            <div key={match.id} className="match-card">
                                <img src={match.photo || "/default-avatar.png"} alt="Profile" className="match-photo"/>
                                <h3>{match.first_name || "Unnamed User"}</h3>
                                <div className="skill-badges">
                                    {match.commonSkills.map((skill, idx) => (
                                        <span key={idx} className="skill-badge">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No top matches found yet. Try updating your skills!</p>
                    )} 
                </div>
            </section>

            <div className="dashboard-matches-link">
                <Link to="/matches" className="matches-button">
                    Find Skill Matches 
                </Link>
            </div>

            <section className="recommendations-section">
                <h2>SkillSwap Recommendations</h2>
                {allMatches.length > 0 ? (
                    <ul className="recommendations-list">
                        {allMatches.map((match) => (
                            <li key={match.id}>
                                <img src={match.photo || "/default-avatar.png"} alt="Profile" className="recommendation-avatar" />
                                <div className="recommendation-info">
                                    <p className="recommendation-name">{match.first_name || "Unnamed User"}</p>
                                    <small>Common Skills: {match.commonSkills.join(", ")}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendations found yet.</p>
                )}
            </section>
            
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;