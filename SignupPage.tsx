import React, { useState } from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import imagepath from '../assets/logo.png';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'jobseeker',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    alert(`Registered as ${formData.role}`);
  };

  return (
    <>
      <NavBar imagepath={imagepath} />
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-form">
            <h2>Create Account</h2>
            <p className="subtitle">Join the RouteMatch community</p>
            <form onSubmit={handleSubmit}>
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />

              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />

              <label>Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label>Password</label>
              <div className="password-container">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>

              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />

              <label>Register As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="role-select"
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>

              <button type="submit" className="submit-btn">Sign up</button>
            </form>

            <p className="signup-text">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>

          <div className="login-info">
            <div className="logo">
              <div className="icon-square">
                <img src={imagepath} alt="RouteMatch Logo" className="logo-img" />
              </div>
              <h1>RouteMatch</h1>
            </div>
            <p className="tagline">Join the platform that connects you with career success.</p>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default SignupPage;
