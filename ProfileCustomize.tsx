import React, { useState } from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import imagepath from '../assets/logo.png';

const ProfileCustomizer: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    mobile: '(987) 654-3210',
    address: 'Bay Area, San Francisco, CA',
    website: 'https://routematch.io',
    github: 'routematch',
    twitter: '@routematch',
    instagram: '@routematch',
    facebook: 'RouteMatch Official',
    bio: 'I am a passionate developer dedicated to creating seamless digital experiences.',
    profession: 'Full Stack Developer'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <>
      <NavBar imagepath={imagepath} />
      <div className="d-flex flex-column min-vh-100">
        <div className="container py-5 flex-grow-1">
          <div className="card shadow-lg p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Short Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-4 py-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <BottomBar />
      </div>
    </>
  );
};

export default ProfileCustomizer;
