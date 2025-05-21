import React from "react";
import LikeButton from "./LikeButton";
import CommentBox from "./comments/CommentBox";

const PostCard = ({ post }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#fdfdfd'
        }}>
            <p><strong>{post.username}</strong> <span style={{ color: '#888' }}>({post.user_email})</span></p>
            <p style={{ fontSize: '14px', color: '#666' }}>{new Date(post.created_at).toLocaleString()}</p>
            <p>{post.content}</p>
            {post.image && (
                <img src={`http://127.0.0.1:8000${post.image}`} alt="Post visual" style={{ maxWidth: '100%', borderRadius: '8px' }} />
            )}

            <div style={{ marginTop: '10px'}}>
                <LikeButton postId={post.id} />
                <CommentBox postId={post.id} />
            </div>
        </div>
    );
};

export default PostCard;