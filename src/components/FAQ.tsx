import React from 'react';

function FAQ() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-3">
          <div className="col-lg-8 col-xl-7">
            <span className="text-muted">F.A.Q</span>
            <h2 className="display-5 fw-bold">Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="py-5 row justify-content-center">
          <div className="col-md-10">
            <div className="row g-3 g-md-4">
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">What is JOB FAIR ?</h5>
                      <p className="m-0">JOB FAIR is a platform that connects job seekers with employers,
                        providing a seamless experience for both parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">What are the frameworks used ?</h5>
                      <p className="m-0">JOB FAIR website uses TypeScript and Vite as its Front-End display, and uses
                        PostGre-SQL as its database. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">Where can i access it ?</h5>
                        <p className="m-0">Find job offers anywhere, anytime. Sign in with your own Job Fair account 
                        to instantly connect with recruiters from your phone or laptop. Job Fair provides flexibility and convenience
                        for browsing opportunities, submit applications, and track your progress all in one place 24/7.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">How can i connect with recruiters ?</h5>
                      <p className="m-0">Discover job offers that match your profile and apply to them. Job Fair will
                        automatically send your application to the recruiter. Recruiters will be able to see your profile and send
                        you a direct automatic message via Job Fair's algorithm through social media platforms like Whatsapp, Messenger, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">How much do our services cost ?</h5>
                      <p className="m-0 tracking-wide"> 
                                    <strong>- Gold Plan:</strong> <span className="ms-4"> Free ALL </span> <br></br>
                                    <strong>- Silver Plan:</strong> <span className="ms-3"> Free SOME </span> <br></br>
                                    <strong>- Bronze Plan:</strong> <span className="ms-3"> Free NONE </span> <br></br>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4 faq-card">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">Why should you choose JOB FAIR ?</h5>
                      <p className="m-0">Our system utilizes machine learning and PMS (Personalization Management System)
                        to provide you with the best job offers that match your profile.
                      </p>
                    </div>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
