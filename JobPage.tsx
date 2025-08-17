import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../style.css';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import BottomBar from '../components/BottomBar';
import pathofimage from '../assets/logo.png';

const jobsEN = [
  {
    title: 'Frontend Developer',
    company: 'TechHive Inc.',
    location: 'Remote',
    tags: ['React', 'TypeScript', 'Full-time'],
    time: '2h ago',
  },
  {
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Jakarta',
    tags: ['Figma', 'UX', 'Remote'],
    time: '1d ago',
  },
  {
    title: 'Backend Developer',
    company: 'GoTech',
    location: 'Bandung',
    tags: ['Node.js', 'Express', 'MongoDB'],
    time: '3d ago',
  },
];

const jobsID = [
  {
    title: 'Pengembang Frontend',
    company: 'TechHive Inc.',
    location: 'Remote',
    tags: ['React', 'TypeScript', 'Penuh Waktu'],
    time: '2 jam lalu',
  },
  {
    title: 'Desainer UI/UX',
    company: 'DesignHub',
    location: 'Jakarta',
    tags: ['Figma', 'UX', 'Remote'],
    time: '1 hari lalu',
  },
  {
    title: 'Pengembang Backend',
    company: 'GoTech',
    location: 'Bandung',
    tags: ['Node.js', 'Express', 'MongoDB'],
    time: '3 hari lalu',
  },
];

const JobPage: React.FC = () => {
    const [language, setLanguage] = useState<'EN' | 'ID'>('EN');
    const isEN = language === 'EN';
    const jobs = isEN ? jobsEN : jobsID;

   return (
    <>
    <NavBar imagepath={pathofimage} />
        <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-outline-secondary" onClick={() => setLanguage(isEN ? 'ID' : 'EN')}>
            {isEN ? '🇮🇩 Translate to Indonesian' : '🇬🇧 Translate to English'}
            </button>
        </div>
        <div className="row">
            <div className="col-md-4 col-lg-3 mb-4">
            <div className="card p-3">
                <h5 className="mb-3">{isEN ? 'Filter Jobs' : 'Filter Pekerjaan'}</h5>
                <div className="mb-3">
                <label className="form-label">{isEN ? 'Location' : 'Lokasi'}</label>
                <input type="text" className="form-control" placeholder={isEN ? 'e.g., Jakarta' : 'cth: Jakarta'} />
                </div>
                <div className="mb-3">
                <label className="form-label">{isEN ? 'Job Type' : 'Jenis Pekerjaan'}</label>
                <select className="form-select">
                    <option>{isEN ? 'All' : 'Semua'}</option>
                    <option>{isEN ? 'Full-Time' : 'Penuh Waktu'}</option>
                    <option>{isEN ? 'Part-Time' : 'Paruh Waktu'}</option>
                    <option>{isEN ? 'Internship' : 'Magang'}</option>
                </select>
                </div>
                <button className="btn btn-primary w-100">{isEN ? 'Apply Filters' : 'Terapkan Filter'}</button>
            </div>
            </div>

            <div className="col-md-8 col-lg-9">
            <div className="row">
                {jobs.map((job, idx) => (
                <div className="col-12 mb-4" key={idx}>
                    <div className="card job-card shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                        <h5 className="mb-1">{job.title}</h5>
                        <p className="mb-1 text-muted">{job.company} – {job.location}</p>
                        </div>
                        <small className="text-muted">{job.time}</small>
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                        {job.tags.map((tag, index) => (
                        <span key={index} className="badge bg-primary-subtle text-primary border border-primary">
                            {tag}
                        </span>
                        ))}
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-sm btn-outline-primary me-2">
                        {isEN ? 'Apply' : 'Lamar'}
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                        {isEN ? 'Save' : 'Simpan'}
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    <BottomBar />
    </>
  );
};

export default JobPage;
