import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.css";

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();           // initialize navigate function

    const handleLogout = async () => {
        try{
            await logout();
            console.log("User logged out successfully!");
            navigate("/");    //redirect to home after logout
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <Navbar expand="lg" className="custom-navbar" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                SkillSwap
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-item">Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className="nav-link-item">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/profile" className="nav-link-item">Profile</Nav.Link>
                        {user && (
                            <Nav.Link as={Link} to="/matches" className="nav-link-item">Matches</Nav.Link>
                        )}
                        {/* <Nav.Link as={Link} to="/posts">Explore Posts</Nav.Link>
                        <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link> */}
                        {!user && (
                            <>
                            <Nav.Link as={Link} to="/signup" className="nav-link-item">Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login" className="nav-link-item">Login</Nav.Link>                            
                            </>
                        )}
                        {user && (
                            <>
                                <Navbar.Text className="welcome-text">
                                    Welcome, {user?.first_name || "User"}!
                                </Navbar.Text>
                                <Nav.Link as={Link} to="/posts">Explore Posts</Nav.Link>
                                <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link>
                                <Nav.Link as="button" className="logout-button" onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>                            
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;