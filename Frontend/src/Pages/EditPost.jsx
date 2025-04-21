import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../UI/EditPost.css'; // Assuming you have a CSS file for styling

const EditPost = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`http://localhost:5000/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTitle(data.data.myPost.title);
            setContent(data.data.myPost.content);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.patch(
            `http://localhost:5000/posts/${id}`,
            { title, content },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/Dashboard');
    };

    return (
        <div className="edit-post-container">
          <form className="edit-post-form" onSubmit={handleSubmit}>
            <h1>Edit Post</h1>
    
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
    
            <button className="submit-button" type="submit">Update</button>
          </form>
        </div>
      );
};

export default EditPost;