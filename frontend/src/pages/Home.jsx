import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/Home.css";

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero-section">
                <Container className="text-center">
                    <h1 className="hero-title">Welcome to SkillSwap!</h1>
                    <p className="hero-subtitle">Learn, Teach, and Connect with skilled professionals.</p>
                    <Button variant="light" size="lg" className="hero-button">
                        Get Started
                    </Button>
                </Container>
            </div>

            {/* Features Section  */}
            <Container className="features-section">
                <Row className="text-center">
                    <Col md={4} className="feature-box">
                        <h3>Learn New Skills</h3>
                        <p>Connect with experts and gain real-world knowledge.</p>
                    </Col>
                    <Col md={4} className="feature-box">
                        <h3>Swap Your Skills</h3>
                        <p>Trade skills and grow without spending money.</p>
                    </Col>
                    <Col md={4} className="feature-box">
                        <h3>Build Your Network</h3>
                        <p>Meet like-minded individulas and grow together.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );

};

export default Home;