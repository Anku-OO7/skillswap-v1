import React, { useState } from "react";
import axios from "axios";
import api from "../../api/axios";

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            await api.post(`/api/users/skillposts/:id/comments/`, { //axios.post(`http://127.0.0.1.8000/api/users/skillposts/${postId}/comments/`, {
                content,
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            });
            setContent('');
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            console.error("Error posting comments:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <textarea
                placeholder="Write a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="2"
                style={{ width: '100%', padding: '8px' }}
            />
            <button type="submit" style={{ marginTop: '5px' }}>Comment</button>
        </form>
    );
};

export default CommentForm;