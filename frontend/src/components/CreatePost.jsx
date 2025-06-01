import React, { useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Clicked Submit");

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try  {
            console.log("Sending post request...")
            const res = await api.post('/api/users/skillposts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Raw API response:", res);
            console.log("Post created:", res.data);
            console.log("Post created:", res.data);

            setContent('');
            setImage(null);
            if (onPostCreated) {
                onPostCreated();
                console.log("onPostCreated callback called");
            }
            toast.success("Post created");
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
            toast.error("Failed to create post.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h3>Create a New Skill Post</h3>
            <textarea
                placeholder="Write something about your skill, learning, or offer help..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: '100%', minHeight:'80px', marginBottom: '10px', padding: '10px'}}
            />
            <br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginBottom: '10px'}}
            />
            <br />
            <button type="submit" disabled={loading}>
                {loading ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default CreatePost;