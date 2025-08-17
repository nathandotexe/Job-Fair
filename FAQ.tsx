import React from 'react';

function FAQ() {
  return (
    <section className="faq-section bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-muted fs-5">Support & Information</span>
          <h2 className="display-5 fw-bold">Frequently Asked Questions</h2>
          <p className="text-muted">Explore quick answers to commonly asked questions about RouteMatch and our platform features.</p>
        </div>

        <div className="row g-4">
          {[
            {
              question: 'What is RouteMatch?',
              answer: `RouteMatch is an intelligent job-matching platform designed to connect job seekers with the right employers through smart recommendations and real-time events.`
            },
            {
              question: 'Which technologies are used to build this platform?',
              answer: `The platform is built using TypeScript with Vite for the frontend, and PostgreSQL as the primary database. We also use modern libraries and frameworks for smooth performance.`
            },
            {
              question: 'How can I access RouteMatch?',
              answer: `RouteMatch is fully accessible on both desktop and mobile browsers. Simply sign in to your account to explore job opportunities, apply directly, and track your applications seamlessly.`
            },
            {
              question: 'How do I connect with employers?',
              answer: `After applying to a job, your profile is automatically shared with relevant employers. You’ll receive follow-ups via email or integrated messaging like WhatsApp, depending on your profile visibility settings.`
            },
            {
              question: 'Is RouteMatch free to use?',
              answer: (
                <>
                  <strong>- Gold Plan:</strong> <span className="ms-2">Full access to all features (Free)</span><br />
                  <strong>- Silver Plan:</strong> <span className="ms-2">Access to standard features (Free)</span><br />
                  <strong>- Bronze Plan:</strong> <span className="ms-2">Basic access only (Free)</span>
                </>
              )
            },
            {
              question: 'Why should I choose RouteMatch?',
              answer: `We combine AI-driven matching with personalized job feeds to help you land better roles faster. RouteMatch saves time, boosts visibility, and ensures you're always one step ahead in your job search.`
            }
          ].map((item, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 bg-white border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-3">{item.question}</h5>
                <p className="m-0">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
