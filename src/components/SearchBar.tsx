import React from 'react';

function SearchBar() {
    return (
        <div className="search-wrapper">
            <div className="search-container">
                <h4 className="mb-4 text-center">Discover Your Dream Career</h4>

                <div className="position-relative mb-4">
                    <input type="text" className="form-control search-input" placeholder="Search..."/>
                    <button type="submit" className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5
                                6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5
                                4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6
                                9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"/>
                        </svg>
                    </button>
                    <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
                </div>

                <div className="search-tags d-flex flex-wrap mb-4">
                    <span className="tag">Technology</span>
                    <span className="tag">Graphic Design</span>
                    <span className="tag">Website Development</span>
                    <span className="tag">Application Development</span>
                    <span className="tag">AI</span>
                    <span className="tag">Machine Learning</span>
                </div>

                <div className="recent-searches pt-3">
                    <p className="text-muted mb-3">Recent Searches</p>
                    <div className="recent-item d-flex align-items-center">
                        <i className="bi bi-clock-history me-2"></i>
                            <span>Software Engineer</span>
                    </div>
                    
                    <div className="recent-item d-flex align-items-center">
                        <i className="bi bi-clock-history me-2"></i>
                        <span>Javascript Web Developer</span>
                    </div>
                    
                    <div className="recent-item d-flex align-items-center">
                        <i className="bi bi-clock-history me-2"></i>
                        <span>Laravel Web Developer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;