import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const toggleLike = async () => {
        if (!token) return alert("Please login to like posts");
        setLoading(true);

        try {
            const res = await api.post(`/api/users/skillposts/:id/like/`, //axios.post(
                 // `http://127.0.0.1:8000/api/users/skillposts/${postId}/like/`,
                 // {
                    //     headers: {
                        //         Authorization: `Bearer ${token}`,
                        //     },
                        // }
            {});

            setLiked(res.data.liked);
        } catch (err) {
            console.error("Error toggling like:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleLike}
            disabled={loading}
            style={{
                backgroundColor: 'transparent',
                border:'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
            }}
        >
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default LikeButton;