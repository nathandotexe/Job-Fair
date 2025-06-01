import { useState } from 'react'
import { defineConfig } from 'vite'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/Contact';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || ''}>
      <Router>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />}  />
          </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;