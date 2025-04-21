import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../UI/CreatePost.css'; // Import your CSS file for styling the form

    
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
      
            await axios.post('http://localhost:5000/posts',
                { title, content },
                { headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/Dashboard');
        
        
    };

    return (
        <div className="create-post-container"> 
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        placeholder="Enter content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Post</button>
            </form>
        </div>
    );
};

export default CreatePost;