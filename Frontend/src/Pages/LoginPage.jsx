import React, { useState } from 'react';
import '../UI/LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });



  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // 1. Prepare the request payload
    const loginData = {
      email,
      password,
    };

    
      // 2. Send a POST request to your authentication API
      const { data } = await axios.post('http://localhost:5000/users/login', loginData, );
      localStorage.setItem('token', data.token);
      navigate('/Dashboard');
      
   
  ;}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
