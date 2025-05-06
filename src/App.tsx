import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import FAQ from './components/FAQ';
import BottomBar from './components/BottomBar';
import nameofbrand from './assets/name.png'
import pathofimage from './assets/logo.png';
import jobinterview from './assets/jobinterview.jpg';

function App() {
  return (
      <>
        <NavBar imagepath={pathofimage} />
        <h1 className="title" style={{textAlign: 'center',}}> Elevate Your Career with Ease</h1>
        <h2 className="subheader" style={{textAlign: 'center',}}> Enjoy seamless event navigation, real-time employer feeds,
        and personalized role recommendations—all in one smart platform. </h2>
        <div className="placeholder-container" style={{ backgroundImage: `url(${jobinterview})` }}>
          <SearchBar />
      </div>
        {/* <FAQ /> */}
        <BottomBar />
      </>
  );
}

export default App;
