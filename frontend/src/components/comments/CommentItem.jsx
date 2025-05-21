import React from "react";

const CommentItem = ({ comment }) => {
    return (
        <div style={{ borderBottom: '1px solid #ddd', padding: '6px 0' }}>
            <strong>{comment.username}</strong>
            <span style={{ color: '#999', fontSize: '12px' }}> - {new Date(comment.created_at).toLocaleString()}</span>
            <p style={{ margin: '4px 0' }}>{comment.content}</p>
        </div>
    );
};

export default CommentItem;