import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  imagepath: string;
}

function NavBar({ imagepath }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" 
    style={{
      boxShadow: '0 4px 8px rgb(102, 233, 224)',
      height: '60px',         
      overflow: 'visible',      
      alignItems: 'center',           
    }}>
      <a className="navbar-brand" href="/" style={{display: 'flex', alignItems: 'center'}}>
      <img src={imagepath} alt="LogoImg" style={{ marginLeft: '30px', width: 'auto', height: '80px'}} className="img-fluid"/>
      </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: '150px' }}>
          <ul className="navbar-nav" style={{ marginRight: '80px' }}>
            <li className="nav-item active">
              <a className="nav-link" href="#" style={{ fontFamily: 'Plus Jakarta Sans', marginRight: '100px'}}>Home</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontFamily: 'Plus Jakarta Sans', marginRight: '100px'}}>My Network</a>
            </li>
        
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontFamily: 'Plus Jakarta Sans', marginRight: '100px'}}>Job Opportunities</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontFamily: 'Plus Jakarta Sans', marginRight: '100px'}}>Contact Us</a>
            </li>

            <a href="./" type="button" style={{fontSize: '20px', color: '#DCDCDD'}} className="btn btn-outline-dark ms-auto me-2"> Sign In </a>
            <a href="./" type="button" style={{fontSize: '20px', color: '#00272B'}} className="btn btn-outline-light ms-auto me-2"> Sign Up </a>
          </ul>
        </div>
    </nav>
  );
}

export default NavBar;