import React, {useState} from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import imagepath from '../assets/logo.png';
import BottomBar from '../components/BottomBar';

const Contact: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
        };
    
    return (
        <>
            <NavBar imagepath={imagepath} />
            <div className="login-container" style={{marginTop: '50px', width: '1200px', marginBottom: '30px'}}>
                <h1 className="title">Contact us</h1>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="name" name="name" className="form-control" />
                        <label className="form-label" typeof="name">Name</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="email" name="email" className="form-control" />
                        <label className="form-label" typeof="email">Email address</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="subject" name="subject" className="form-control" />
                        <label className="form-label" typeof="subject">Subject</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <textarea className="form-control" id="message" name="message" rows={4}></textarea>
                        <label className="form-label" typeof="message">Message</label>
                    </div>

                    <button data-mdb-button-init id="submit-form" type="submit" data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        Send
                    </button>
            </div>
            <BottomBar />   
        </>  
    );
}

export default Contact;