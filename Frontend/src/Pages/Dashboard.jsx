import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../UI/Dashboard.css'; // Assuming you have a CSS file for styling

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/posts', 
                { headers: { Authorization: `Bearer ${token}` }});
            setPosts(data.data.myPosts);
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
 const handleFavorite = async (postId) => {
    const token = localStorage.getItem('token');
  
      await axios.put(
        `http://localhost:5000/posts/favorite/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, favorite: !post.favorite } : post
        )
      );
    
  };
    return (
        <>
            <nav>
                <button onClick={() => navigate('/Dashboard')}>Posts</button>
                <button onClick={() => navigate('/userdetails')}>User Details</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h1>ArcNews</h1>
            <button onClick={() => navigate('/createpost')} className="create-post-button">Create Post</button>

            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button 
                                onClick={() => navigate(`/editpost/${post._id}`)} 
                                className="edit-button">✏️Edit</button>
                        <button onClick={async () => {
                                const token = localStorage.getItem('token');
                                await axios.delete(`http://localhost:5000/posts/${post._id}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                setPosts(posts.filter((p) => p._id !== post._id));
                            
                        }}className="delete-button">🗑 Delete</button>
                        <button
                    onClick={() => handleFavorite(post._id)}
                  className="favorite-button"
                  >
                    ⭐ {post.favorite ? 'Unfavorite' : 'Favorite'}
                  </button>
                    </li>
                ))}
            </ul>
            
        </>
    );
};

export default Dashboard;