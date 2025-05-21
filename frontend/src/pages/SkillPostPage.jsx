import React, { useEffect, useState } from "react";
import axios from 'axios';
import PostCard from '../components/PostCard';
import CreatePost from "../components/CreatePost";
import api from "../api/axios";

const SkillPostPage = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        // const token = localStorage.getItem("token");
        api.get('/api/users/skillposts/')//axios.get('http://127.0.0.1:8000/api/users/skillposts/', {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // })
        .then(res => setPosts(res.data))
        .catch(err => console.error('Error fetching posts:', err));
        };
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Skill Feed</h2>
            <CreatePost onPostCreated={fetchPosts} />

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map(post => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
};

export default SkillPostPage;