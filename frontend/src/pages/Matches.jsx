import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Card, Button, Container, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Matches.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Matches = () => {
    const { user } = useAuth();
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    
    const fetchMatches = async () => {
        if (!user) return;

        console.log("Refreshing Matches...");
        setLoading(true);
        setRefreshing(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/users/matches/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Matches response data:", response.data);

            const data = response.data.matches || [];
            setMatchedUsers(data);
        } catch (error) {
            console.error("Error fetching matches:", error);
            setMatchedUsers([]);
            setTimeout(() => {
                toast.error("Failed to fetch matches!");
            }, 100);
            setTimeout(() => {
                toast.info("No matches found. Try adding skills!");
            }, 100);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };
        useEffect(() => {
            console.log("Current user in Matches page:", user);
            if (user) {
                fetchMatches();
            }
    }, [user]);

    if (loading) return <Loader />;
    //     {
    //     return (
    //         <div className="matches-loading">
    //             <Spinner animation="border" variant="primary" />
    //             <p>Finding best matches for you...</p>
    //         </div>
    //     );
    // }

    return (
        <Container className="matches-page">
            <h2 className="matches-title">Matched Users based on your Skills</h2>

            <div className="refresh-btn-container">
                <Button variant="outline-primary" onClick={fetchMatches} disabled={refreshing}>
                    {refreshing ? (
                        <>
                        <Spinner animation="border" size="sm" /> Refreshing...
                        </>
                    ) : (
                        <>Refresh Matches</>
                    )}
                </Button>
            </div>

            {matchedUsers.length > 0 ? (
                matchedUsers.map((match) => (
                    <Card key={match.id} className="match-card">
                        <Card.Body>
                            <div className="match-header">
                                {match.photo ? (
                                        <img
                                            src={match.photo}
                                            alt="User Avatar"
                                            className="match-avatar"
                                        />
                                ) : (
                                        <img
                                            src="/default-avatar.png"
                                            alt="Default Avatar"
                                            className="match-avatar"
                                        />
                                )}
                                <h5 className="match-name">{match.first_name || "Unnamed User"}</h5>
                            </div>

                            <Card.Text>
                                <strong>Common Skills:</strong><br/>
                                {match.commonSkills?.length > 0 ? (
                                    <div className="skills-list">
                                        {match.commonSkills.map((skill, index) => (
                                            <Badge key={index} className="skill-badge" bg="success">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No skills listed.</p>
                                )}
                            </Card.Text>

                            {/* view profile button  */}
                            <Button as={Link} to={`/profile/${match.id}`} variant="primary" className="view-profile-btn">
                                View Profile
                            </Button>
                        </Card.Body>                    
                    </Card>
                ))
            ) : (
                <div className="no-matches">
                    <p>No matches found yet.<br /> Try adding more skills to increase your chances!</p>
                </div>
            )}
        </Container>
    );
};

export default Matches;
