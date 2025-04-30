import  React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
    const { user, loading  } = useAuth();  // get user from context

    console.log("Protected Route | loading:", loading);
    console.log("Protected Route | user:", user);
    
    if (loading){
        return (
            <div className="protected-loading">
                <Spinner animation="border" role="status" />
                <p>Loading Protected Content...</p>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;