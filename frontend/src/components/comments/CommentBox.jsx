import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import api from "../../api/axios";

const CommentBox = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await  api.get(`/api/users/skillposts/:id/comments/`)// axios.get(`http://127.0.0.1:8000/api/users/skillposts/${postId}/comments/`);
            setComments(res.data);
        } catch (err) {
            console.error('Error loading comments:', err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div style={{ marginTop: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
            <h4>Comments</h4>
            {comments.length === 0 ? <p>No comments yet.</p> : (
                comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            )}

            <CommentForm postId={postId} onCommentAdded={fetchComments} />
        </div>
    );
};

export default CommentBox;