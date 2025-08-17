import React from 'react';

function BottomBar() {
    return (
        <footer className="footer bg-dark text-white pt-4">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase fw-bold">About RouteMatch</h5>
                        <p>
                            RouteMatch connects job seekers with top employers through smart events, real-time feeds,
                            and tailored recommendations—making your career journey seamless.
                        </p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/jobinfo" className="text-white text-decoration-none">Job Opportunities</a></li>
                            <li><a href="/network" className="text-white text-decoration-none">My Network</a></li>
                            <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase fw-bold">Contact</h5>
                        <p>Email: support.routematch@gmail.com</p>
                        <p>Phone: +62 815-7412-5686</p>
                        <div className="d-flex gap-3 mt-2">
                            <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-twitter-x"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                </div>
                <hr className="border-light" />
                <div className="text-center pb-3">
                    <small>© 2025 RouteMatch. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
}

export default BottomBar;