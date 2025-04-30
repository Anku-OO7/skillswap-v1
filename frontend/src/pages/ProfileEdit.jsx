import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfileEdit.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ProfileEdit = () => {    
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState("");
    const [bio, setBio] = useState("");
    const [skillInput, setSkillInput] = useState("");
    const [profilePicURL, setProfilePicURL] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [location, setLocation]= useState("");
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const { fetchUserData } = useAuth();

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
                const { first_name, email, bio, skills, photo, github, linkedin, location } = res.data;
                setFirstName(first_name || "");
                setEmail(email || "");
                setBio(bio || "");
                setSkillInput((skills || []).join(", "));
                setProfilePicURL(photo || "");
                setGithub(github || "");
                setLinkedin(linkedin || "");
                setLocation(location || "");
            } catch (error) {
                console.error("Error fetching profile:", error);
                setTimeout(() => {
                    toast.error("Profile update failed!", {autoClose: 3000 });
                }, 100);
            } finally {
                setloading(false);
            }
        };
        fetchProfile();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!firstName.trim()) return alert("Bina naam k accept na kru!😤"); 
        if (bio.trim().length < 10) return alert("kuch to likh apne bare me!! Bnaun tera Sergio Marquina");

        const cleanedSkills = skillInput
            .split(",")
            .map(skill => skill.trim())
            .filter((skill) => skill.length > 0);

        if (cleanedSkills.length === 0) return alert("Looser!! 1 bhi skill nhi tere me??");
        
        try {
            const token = localStorage.getItem("token");
            const formData = {
                first_name: firstName,
                bio,
                skills: cleanedSkills,
                photo: profilePicURL,
                github,
                linkedin,
                location,
            };
             
            const response = await axios.put(
                "http://localhost:8000/api/users/profile/update/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                withCredentials: true }
            );
            console.log("Profile update ho gyi!! 💃💃", response.data);
            
            toast.success("Profile updated successfully!");
            await fetchUserData();
            setTimeout(() => {
                navigate("/profile");
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Kuch to gadbad hai daya!! ")
        }
    };

    if (loading) return <Loader />;
    //     {
    //     return (
    //         <div className="loading-message">
    //             <div className="loader"></div>
    //             <p>Loading your profile...</p>
    //         </div>
    //     );
    // } 

    return (
        <div className="profile-edit-container">
            <h2 className="profile-edit-title">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="profile-edit-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your 1st name"
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                    />
                </div>

                <div className="form-group">
                <label>Bio:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        rows={4}
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label>Skills:</label>
                    <input 
                        type="text"
                        value={skillInput}
                        onChange={(event) =>setSkillInput(event.target.value)}
                        placeholder="e.g. React, Firebase, UI Design"
                    />
                </div>

                <div className="form-group">
                    <label>GitHub URL:</label>
                    <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="https://github.com/yourprofile"
                    />
                </div>
                
                <div className="form-group">
                    <label>LinkedIn:</label><br/>
                    <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>

                <div className="form-group">
                    <label>Location:</label><br/>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, Country"
                    />
                </div>

                <div className="form-group">
                    <label>Paste Profile Picture URL:</label>
                    <input
                        type="text"
                        value={profilePicURL}
                        onChange={(e) => setProfilePicURL(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                
                {profilePicURL && (
                    <div className="profileedit-preview">
                        <p>Preview:</p>
                        <img src={profilePicURL} alt="Preview" className="profile-image-preview" />
                    </div>
                )}

                    {/* Submit Button  */}
                <button type="submit" className="profile-edit-submit-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ProfileEdit;
