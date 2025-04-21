import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UI/RegisterPage.css'; 
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };

    
       await axios.post('http://localhost:5000/users/signup',registrationData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      
        navigate('/login');
      

   
  };


  return (
    <div className="register-container">
      <h2>Register</h2>
        {/* Error message display */}
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;