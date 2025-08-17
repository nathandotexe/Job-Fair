import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import FAQ from '../components/FAQ';
import BottomBar from '../components/BottomBar';
import pathofimage from '../assets/logo.png';
import jobinterview from '../assets/jobinterview.jpg';

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    setAnimateTitle(false);
    const timer = setTimeout(() => {
      setAnimateTitle(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar imagepath={pathofimage} />
      
      <section className="hero-section">
        <h1 className={`title ${animateTitle ? 'animated fadeInUp' : ''}`}>
          Elevate Your Career With Ease.
        </h1>
        <h2 className={`subheader ${animateTitle ? 'animated fadeInDown' : ''}`}>
          Enjoy seamless event navigation, real-time employer feeds,
          and personalized role recommendations—all in one smart platform.
        </h2>
        <div className="placeholder-container" style={{ backgroundImage: `url(${jobinterview})` }}>
          <SearchBar />
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefit">
            <div className="benefit-icon">🌐</div>
            <h3>Smart Job Matching</h3>
            <p>AI-driven tools help you find roles that align with your skills and interests.</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">📆</div>
            <h3>Live Career Events</h3>
            <p>Attend job fairs and webinars to meet employers and expand your network.</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">💼</div>
            <h3>Verified Companies</h3>
            <p>Engage only with credible, screened employers to ensure safe opportunities.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title" style={{color: "white"}}>What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>"RouteMatch helped me land my dream job within two weeks. The real-time alerts and employer insights were game-changing."</p>
            <h4>– Alya, Software Developer</h4>
          </div>
          <div className="testimonial">
            <p>"I used to struggle finding job fairs that matched my interests. Now, it's all in one dashboard!"</p>
            <h4>– Budi, Data Analyst</h4>
          </div>
        </div>
      </section>

      <div className='faq-container'>
        <FAQ />
      </div>

      <BottomBar />
    </>
  );
};

export default HomePage;
