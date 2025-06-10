import React, { useState } from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import imagepath from '../assets/logo.png';
import BottomBar from '../components/BottomBar';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'feedback',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', category: 'feedback', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NavBar imagepath={imagepath} />
            <div className="contact-container">
                <div className="contact-hero">
                    <div className="container text-center">
                        <h1 className="title">Help Us Improve</h1>
                        <p className="subheader">
                            Your feedback, complaints, and suggestions help us create a better experience for everyone.
                        </p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="d-flex flex-column gap-4">
                                <div className="card info-card h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="icon-wrapper bg-primary">
                                            <i className="bi bi-lightbulb-fill text-white"></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 fw-semibold">Share Your Ideas</h3>
                                            <p className="text-secondary mb-0">Got suggestions for new features? We'd love to hear them!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card info-card h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="icon-wrapper bg-danger">
                                            <i className="bi bi-exclamation-triangle-fill text-white"></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 fw-semibold">Report Issues</h3>
                                            <p className="text-secondary mb-0">Encountered a bug? Let us know so we can fix it.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card info-card h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="icon-wrapper bg-success">
                                            <i className="bi bi-heart-fill text-white"></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 fw-semibold">General Feedback</h3>
                                            <p className="text-secondary mb-0">Share your overall experience. Every opinion matters!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="col-lg-6">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4 p-md-5">
                                    <h2 className="card-title text-center fw-bold mb-4">Get In Touch</h2>
                                    
                                    {submitStatus === 'success' && (
                                        <div className="alert alert-success d-flex align-items-center" role="alert">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <div>Thank you! Your message has been sent successfully.</div>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="bi bi-x-circle-fill me-2"></i>
                                            <div>Something went wrong. Please try again.</div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label">Full Name *</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="form-control form-label form-control-lg" placeholder="Your Name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label">Email Address *</label>
                                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-control form-label form-control-lg" placeholder="your.email@example.com" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="category" className="form-label">Category *</label>
                                                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="form-select form-label form-select-lg">
                                                    <option value="feedback">General Feedback</option>
                                                    <option value="complaint">Complaint</option>
                                                    <option value="suggestion">Suggestion</option>
                                                    <option value="bug">Bug Report</option>
                                                    <option value="feature">Feature Request</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="subject" className="form-label">Subject *</label>
                                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="form-control form-label form-control-lg" placeholder="Brief description" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="message" className="form-label">Message *</label>
                                                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="form-control form-label form-control-lg" placeholder="Enter your critiques and tips.."></textarea>
                                                <div className="form-text text-end">{formData.message.length}/500</div>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Sending...
                                                        </>
                                                    ) : 'Send Message'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomBar />
        </>
    );
}

export default Contact;