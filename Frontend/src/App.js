import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage'; 
import LoginPage from './Pages/LoginPage'; 
import Dashboard from './Pages/Dashboard';
import CreatePost from './Pages/CreatePost'; 
import EditPost from './Pages/EditPost'; 
import UserDetails from './Pages/UserDetails';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CreatePost" element={<CreatePost/>} />
        <Route path="/editPost/:id" element={<EditPost />} />
        <Route path="/userdetails" element={<UserDetails />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
