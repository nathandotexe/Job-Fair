import React, {useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../style.css';
import NavBar from '../components/NavBar';
import imagepath from '../assets/logo.png';
import BottomBar from '../components/BottomBar';

const ProfilePage: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) {
        return (
            <>
                <NavBar imagepath={imagepath} />
                <div className="container py-5">
                    <div className="text-center">
                        <h2>Please log in to view your profile</h2>
                        <a href="/login" className="btn btn-primary">Go to Login</a>
                    </div>
                </div>
            </>
        );
    }
    
  return (
    <>
    <NavBar imagepath={imagepath} />
    <div className="container py-5">
      <div className="main-body">

        <div className="row gutters-sm">
          {/* Left Sidebar */}
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4>John Doe</h4>
                    <p className="text-secondary mb-1">
                      Full Stack Developer
                    </p>
                    <p className="text-muted font-size-sm">
                      Bay Area, San Francisco, CA
                    </p>
                    <button className="btn btn-primary" style={{ marginBottom: '10px'}}>
                      Follow
                    </button>
                    <button className="btn btn-outline-primary">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                {[
                  { icon: 'globe', label: 'Website', value: 'https://bootdey.com' },
                  { icon: 'github', label: 'Github', value: 'bootdey' },
                  { icon: 'twitter', label: 'Twitter', value: '@bootdey' },
                  { icon: 'instagram', label: 'Instagram', value: 'bootdey' },
                  { icon: 'facebook', label: 'Facebook', value: 'bootdey' }
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`feather feather-${item.icon} mr-2 icon-inline`}
                      >
                        {/* SVG paths omitted for brevity */}
                      </svg>
                      {item.label}
                    </h6>
                    <span className="text-secondary">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {[
                  { title: 'Full Name', value: 'Kenneth Valdez' },
                  { title: 'Email', value: 'fip@jukmuh.al' },
                  { title: 'Phone', value: '(239) 816-9029' },
                  { title: 'Mobile', value: '(320) 380-4539' },
                  { title: 'Address', value: 'Bay Area, San Francisco, CA' }
                ].map((field, idx) => (
                  <React.Fragment key={idx}>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">
                          {field.title}
                        </h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {field.value}
                      </div>
                    </div>
                    {idx < 4 && <hr />}
                  </React.Fragment>
                ))}
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info"
                      target="__blank"
                      href="/profilepage"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              {[80, 72, 89, 55, 66].map((pct, idx) => (
                <div className="col-sm-6 mb-3" key={idx}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        Project Status
                      </h6>
                      <small>
                        {[ 'Web Design', 'Website Markup', 'One Page', 'Mobile Template', 'Backend API' ][idx]}
                      </small>
                      <div
                        className="progress mb-3"
                        style={{ height: '5px' }}
                      >
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: `${pct}%` }}
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;