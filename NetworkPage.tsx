import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../style.css';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import BottomBar from '../components/BottomBar';
import pathofimage from '../assets/logo.png';

const profiles = [
  {
    name: 'Alya Putri',
    title: 'UI/UX Designer at DesignHub',
    location: 'Jakarta, Indonesia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Reza Hakim',
    title: 'Software Engineer at Gojek',
    location: 'Bandung, Indonesia',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    name: 'Siti Nurlaila',
    title: 'Product Manager at Tokopedia',
    location: 'Yogyakarta, Indonesia',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Dimas Santoso',
    title: 'Data Analyst at Bukalapak',
    location: 'Surabaya, Indonesia',
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
];

const NetworkPage: React.FC = () => {
  const [connections, setConnections] = useState<string[]>([]);

  const handleConnect = (name: string) => {
    setConnections((prev) => [...prev, name]);
  };

  return (
    <>
    <NavBar imagepath={pathofimage} />
        <div className="network-container my-5">
        <div className="row">
            {profiles.map((profile, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card profile-card shadow-sm p-3 h-100">
                <div className="d-flex align-items-center mb-3">
                    <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                    />
                    <div>
                    <h5 className="mb-1">{profile.name}</h5>
                    <small className="text-muted">{profile.title}</small>
                    <div className="text-muted">{profile.location}</div>
                    </div>
                </div>
                <button
                    className={`btn ${connections.includes(profile.name) ? 'btn-secondary' : 'btn-outline-primary'} w-100`}
                    disabled={connections.includes(profile.name)}
                    onClick={() => handleConnect(profile.name)}
                >
                    {connections.includes(profile.name) ? 'Connected' : 'Connect'}
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    <BottomBar />
    </>
  );
};

export default NetworkPage;
