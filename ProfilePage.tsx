import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../style.css';
import NavBar from '../components/NavBar';
import imagepath from '../assets/logo.png';
import BottomBar from '../components/BottomBar';

const ProfilePage: React.FC = () => {
  const [links, setLinks] = useState([
    { label: 'Website', value: 'https://routematch.io' },
    { label: 'GitHub', value: 'routematch' },
    { label: 'Twitter', value: '@routematch' },
    { label: 'Instagram', value: '@routematch' },
    { label: 'Facebook', value: 'RouteMatch Official' }
  ]);

  const [skills, setSkills] = useState([
    { label: 'Web Design', value: 80 },
    { label: 'Frontend', value: 72 },
    { label: 'API Integration', value: 89 },
    { label: 'UX Research', value: 55 },
    { label: 'Backend Logic', value: 66 }
  ]);

  const updateLink = (index: number, newValue: string) => {
    const updatedLinks = [...links];
    updatedLinks[index].value = newValue;
    setLinks(updatedLinks);
  };

  const updateSkill = (index: number, newValue: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].value = newValue;
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    console.log('Saving links:', links);
    console.log('Saving skills:', skills);
    alert('Profile changes saved!');
  };

  return (
    <>
      <NavBar imagepath={imagepath} />
      <div className="d-flex flex-column min-vh-100">
        <div className="profile-wrapper flex-grow-1">
          <div className="container py-5">
            <div className="row">
              {/* Left Profile Card */}
              <div className="col-md-4 mb-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="User Avatar"
                      className="rounded-circle mb-3"
                      width={120}
                    />
                    <h4 className="fw-bold">John Doe</h4>
                    <p className="text-muted">Full Stack Developer</p>
                    <p className="text-secondary small">Bay Area, San Francisco, CA</p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-secondary">Change Avatar</button>
                      <button className="btn btn-outline-secondary">Settings</button>
                    </div>
                  </div>
                </div>

                <div className="card mt-4 shadow-sm">
                  <ul className="list-group list-group-flush">
                    {links.map((item, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{item.label}</span>
                        <input
                          type="text"
                          className="form-control form-control-sm ms-3"
                          value={item.value}
                          onChange={(e) => updateLink(idx, e.target.value)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Detail Section */}
              <div className="col-md-8">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    {[{ title: 'Full Name', value: 'John Doe' },
                      { title: 'Email', value: 'john.doe@example.com' },
                      { title: 'Phone', value: '(123) 456-7890' },
                      { title: 'Mobile', value: '(987) 654-3210' },
                      { title: 'Address', value: 'Bay Area, San Francisco, CA' }
                    ].map((field, idx) => (
                      <React.Fragment key={idx}>
                        <div className="row mb-3">
                          <div className="col-sm-3 fw-semibold">{field.title}</div>
                          <div className="col-sm-9 text-secondary">{field.value}</div>
                        </div>
                        {idx < 4 && <hr />}
                      </React.Fragment>
                    ))}
                    <div className="text-end">
                      <a href="/customize" className="btn btn-info me-2">Edit Profile</a>
                      <button className="btn btn-success" onClick={handleSave}>Save</button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {skills.map((skill, idx) => (
                    <div className="col-sm-6 mb-4" key={idx}>
                      <div className="card h-100 shadow-sm">
                        <div className="card-body">
                          <h6 className="fw-bold">{skill.label}</h6>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.value}
                            onChange={(e) => updateSkill(idx, Number(e.target.value))}
                            className="form-range"
                          />
                          <div className="progress mt-2" style={{ height: '5px' }}>
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{ width: `${skill.value}%` }}
                              aria-valuenow={skill.value}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
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
        <BottomBar />
      </div>
    </>
  );
};

export default ProfilePage;
