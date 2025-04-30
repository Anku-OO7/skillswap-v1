import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Loader from "../components/Loader";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8000/api/users/profile/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setProfile(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err)
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <Loader />;
    //     {
    //     return (
    //         <div className="profile-loading">
    //             <div className="loader"></div>
    //             <p>Loading your profile...</p>
    //         </div>
    //     );
    // }

    if (!profile) {
        return <p className="profile-error">Failed to load your profile.Please try again later.</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1 className="profile-title">Your Profile</h1>
            </div>

            {profile.photo ? (
                <img
                    src={profile.photo}
                    alt="Profile"
                    className="profile-image"
                />            
            ) : (
                <div className="profile-image-placeholder">
                    <span>No Image</span>
                </div>
            )}

            <div className="profile-info">
                <p className="profile-field"><strong>Name:</strong> {profile.first_name || "Not set"}</p>
                <p className="profile-field"><strong>Email:</strong> {profile.email || "Not set"}</p>
                <p className="profile-field"><strong>Bio:</strong> <em>{profile.bio || "No bio yet"}</em></p>
                <p className="profile-field"><strong>Location:</strong> {profile.location || "Not set"}</p>
                <p className="profile-field"><strong>GitHub:</strong> {profile.github || "Not set"}</p>
                <p className="profile-field"><strong>LinkedIn:</strong> {profile.linkedin || "Not set"}</p>
                <div className="profile-field">
                    <strong>Skills:</strong>
                    {profile.skills?.length > 0 ? (
                        <div className="skills-list">
                            {profile.skills.map((skill, idx) => (
                                <span key={idx} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    ) : (
                        <p>"No skills added"</p>
                    )}
                </div>
            </div>

            <button 
                onClick={() => navigate("/edit-profile")} 
                className="profile-edit-button">
                Edit Profile
            </button>
        </div>
    );
};

export default Profile;
