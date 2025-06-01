import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  imagepath: string;
}

function NavBar({ imagepath }: NavbarProps) {
  const [fadeIn, setFadeIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark navbar-custom ${fadeIn ? 'fade-in' : ''} ${scrolled ? 'sticky-nav' : ''}`}
      style={{
        boxShadow: '0 4px 8px rgb(91, 152, 148)',
        height: 'auto',
        padding: '0 1rem',
        overflow: 'visible',
        alignItems: 'center',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/" style={{ display: 'flex', alignItems: 'center'}}>
          <img
            src={imagepath}
            alt="LogoImg"
            style={{ width: 'auto', height: '60px' }}
            className="img-fluid"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-center ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav d-flex flex-wrap justify-content-center w-100 text-center">
            {['/', '/network', '/job', '/contact', '/profilepage'].map((path, idx) => {
              const labels = ['Home', 'My Network', 'Job Opportunities', 'Contact Us', 'My Profile'];
              return (
                <li key={idx} className="nav-item">
                  <Link
                    className="nav-link nav-animated"
                    to={path}
                    style={{
                      fontFamily: 'Plus Jakarta Sans',
                      marginRight: '80px',
                      fontSize: '16px',
                    }}
                    onClick={() => setIsNavOpen(false)} 
                  >
                    {labels[idx]}
                  </Link>
                </li>
              );
            })}

            <li className="navbar-nav d-flex" style={{ alignContent: 'center' }}>
              <Link
                to="/login"
                className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
                style={{ fontSize: '20px' }}
                onClick={() => setIsNavOpen(false)}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
