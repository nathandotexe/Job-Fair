import React, { useState } from 'react';
import '../style.css';
import NavBar from '../components/NavBar';
import imagepath from '../assets/logo.png';
import BottomBar from '../components/BottomBar';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'feedback',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-info">
            <div className="logo">
              <div className="icon-square">
                <img src={imagepath} alt="JobConnect Logo" className="logo-img" />
              </div>
              <h1>RouteMatch</h1>
            </div>
            <p className="tagline">
              Your feedback helps us build better tools for your career journey.
            </p>

            <div className="feature">
              <div className="feature-icon">💡</div>
              <div>
                <h3>Share Your Ideas</h3>
                <p>Have a new feature in mind? Let us know!</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">🐞</div>
              <div>
                <h3>Report Bugs</h3>
                <p>Spotted something broken? We’ll fix it fast.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">💬</div>
              <div>
                <h3>General Feedback</h3>
                <p>Your overall impressions matter to us.</p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <p className="subtitle">Send us your questions, suggestions, or problems.</p>

            {submitStatus === 'success' && (
              <div className="alert success">✅ Message sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="alert error">❌ Something went wrong. Try again.</div>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />

              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />

              <label htmlFor="category">Category *</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="feedback">General Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
              </select>

              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief subject"
                required
              />

              <label htmlFor="message">Message *</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                maxLength={500}
                required
              />
              <div className="text-end message-count">{formData.message.length}/500</div>

              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default ContactPage;
