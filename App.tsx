import { useState } from 'react'
import { defineConfig } from 'vite'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NetworkPage from './pages/NetworkPage';
import ProfilePage from './pages/ProfilePage';
import ProfileCustomize from './pages/ProfileCustomize';
import ContactPage from './pages/Contact';
import JobPage from './pages/JobPage';
import UsersPage from './pages/UserPage';
import CreateUserPage from './pages/CreateUserPage';
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/jobinfo" element={<JobPage />}  />
          <Route path="/contact" element={<ContactPage />}  />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/customize" element={<ProfileCustomize />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/createuser" element={<CreateUserPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;