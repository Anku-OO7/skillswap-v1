import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/ProfilePage.css";
import Loader from "../components/Loader";

const ProfilePage = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (!uid) {
            setError("Invalid user ID");
            setLoading(false);
            return;
        }
        const fetchUserProfile = async () => {
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get(`/users/profile/${uid}/`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileUser(response.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
                setError("Failed to load profile.");
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [uid]);

    if (loading) return <Loader />;
    //     {
    //     return (<div className="profile-loading">Loading Profile...</div>);
    // }
    
    if (error) {
        return <div className="profile-error">{error}</div>;
    }

    if (!profileUser) {
        return <div className="profile-error">Profile not available.</div>;
    }

    return (
        <div className="profile-page-container">
            <button className="back-button" onClick={() => navigate("/matches")}>
                Back to Matches
            </button>

            <div className="profile-card">
                <div className="profile-image-container">
                    <img 
                        src={profileUser.photo || "/default-avatar.png"}
                        alt="User Avatar"
                        className="profile-avatar"
                    />
                </div>

                <h2 className="profile-name">{profileUser.first_name || "No Name Provided"}</h2>
                <p className="profile-email">{profileUser.email || "No Email Provided"}</p>

                <div className="profile-section">
                    <h4>About</h4>
                    <p>{profileUser.bio || "No bio available"}</p>
                </div>
            
                <div className="profile-section">
                    <h4>Location</h4>
                    <p>{profileUser.location || "No location provided"}</p>
                </div>

                <div className="profile-section">
                    <h4>Skills</h4>
                    {profileUser.skills?.length > 0 ? (
                        <div className="skills-container">
                            {profileUser.skills.map((skill, idx) => (
                                <span key={idx} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    ) : (
                        <p>No skills listed</p>
                    )}
                </div>

                <div className="profile-section">
                    <h4>Links</h4>
                    <p>
                        <strong>GitHub:</strong> {profileUser.github ? (
                            <a href={profileUser.github} target="_blank" rel="noopener noreferrer">View GitHub</a>
                        ) : "Not Available"}
                    </p>
                    <p>
                        <strong>LinkedIn:</strong> {profileUser.linkedin ? (
                            <a href={profileUser.linkedin} target="_blank" rel="noopener noreffer">View LinkedIn</a>
                        ) : "Not available"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
