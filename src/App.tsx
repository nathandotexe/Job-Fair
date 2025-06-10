import { useState } from 'react'
import { defineConfig } from 'vite'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NetworkPage from './pages/NetworkPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/Contact';
import JobPage from './pages/JobPage';
import UsersPage from './pages/UserPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App: React.FC = () => {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || ''}>
      <AuthProvider>  
        <Router>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobinfo" element={<JobPage />}  />
          <Route path="/contact" element={<ContactPage />}  />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;