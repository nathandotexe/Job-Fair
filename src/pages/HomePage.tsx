import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../style.css';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import FAQ from '../components/FAQ';
import BottomBar from '../components/BottomBar';
import pathofimage from '../assets/logo.png';
import jobinterview from '../assets/jobinterview.jpg';

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Trigger animation on load
  useEffect(() => {
    setAnimateTitle(false); // reset first
    const timer = setTimeout(() => {
      setAnimateTitle(true);
    }, 50); // slight delay to retrigger animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar imagepath={pathofimage} />
      <h1 className={`title ${animateTitle ? 'animated fadeInUp' : ''}`} style={{ textAlign: 'center' }}>
        Elevate Your Career With Ease.
      </h1>
      <h2 className={`subheader ${animateTitle ? 'animated fadeInDown' : ''}`} style={{ textAlign: 'center' }}>
        Enjoy seamless event navigation, real-time employer feeds,
        and personalized role recommendations—all in one smart platform.
      </h2>
      <div className="placeholder-container" style={{ backgroundImage: `url(${jobinterview})` }}>
        <SearchBar />
      </div>
      <div className='faq-container'>
        <FAQ />
      </div>
      <BottomBar />
    </>
  );
};

export default HomePage;
