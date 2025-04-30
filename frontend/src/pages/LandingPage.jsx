import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>Welcome to SkillSwap</h1>
                <p>Your one-stop destination to learn, teach and connect.</p>
                <div className="landing-buttons">
                    <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    <Link to="/login" className="btn btn-outline-light">Login</Link>
                </div>
            </header>

            <section className="landing-features">
                <div className="feature-card">
                    <h3>Learn Real Skills</h3>
                    <p>Connect with experts and learn hands-on skills that matter.</p>
                </div>
                <div className="feature-card">
                    <h3>Skill Exchange</h3>
                    <p>Offer what you know, learn what you don't - no money involved.</p>
                </div>
                <div className="feature-card">
                    <h3>Build a Network</h3>
                    <p>Grow your personal & professional connections across the globe.</p>
                </div>
            </section>

            <footer className="landing-footer">
                <p>Made with 💖 by a dreamer & his AI Sensei</p>
            </footer>
        </div>
    );
};

export default LandingPage;