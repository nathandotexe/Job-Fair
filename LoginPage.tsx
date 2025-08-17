import React, { useState } from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import imagepath from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Logged in as ${role}`);
    }, 1500);
  };

  return (
    <>
      <NavBar imagepath={imagepath} />
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-info">
            <div className="logo">
              <div className="icon-square">
                <img src={imagepath} alt="RouteMatch Logo" className="logo-img" />
              </div>
              <h1>RouteMatch</h1>
            </div>
            <p className="tagline">
              Your gateway to career opportunities. Connect with top employers and find your dream job.
            </p>

            <div className="feature">
              <div className="feature-icon">👥</div>
              <div>
                <h3>Connect with Employers</h3>
                <p>Access thousands of job opportunities from leading companies.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">🏙️</div>
              <div>
                <h3>Career Growth</h3>
                <p>Build your professional network and advance your career.</p>
              </div>
            </div>

            <div className="job-fair">
              <h4>
                Upcoming Job Fair <span className="live-tag">Live</span>
              </h4>
              <p>Tech Career Fair 2024 - Join 500+ companies and 10,000+ professionals</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>

          <div className="login-form">
            <h2>Welcome back</h2>
            <p className="subtitle">Sign in to your account to continue</p>
            <form onSubmit={handleSubmit}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <label>Login As</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>

              <div className="options">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="signup-text">
              Don't have an account? <a href="/signup">Sign up for free</a>
            </p>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default LoginPage;
