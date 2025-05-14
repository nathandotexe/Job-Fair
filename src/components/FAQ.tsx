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
                <div className="card bg-light p-4">
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
                <div className="card bg-light p-4">
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
                <div className="card bg-light p-4">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">How does it work ?</h5>
                      <p className="m-0">The dash camera first tracks the users driving activity. 
                        When it detects the user crossing opposing traffic marks,
                      the algorithm then sends a signal to the camera and screenshot the recorded violation, 
                      which would be sent to the server database.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">What are the main components ?</h5>
                      <p className="m-0">TRAVIS uses an Orange Pi 3b as its storage / middle man, 
                        which connects data between the camera and the server database.
                        It utilizes a dash camera to monitor and record activities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">How much does it cost ?</h5>
                      <p className="m-0">As of right now, TRAVIS is in beta phase and not ready for commercial use.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card bg-light p-4">
                  <div className=" d-flex">
                    <div className="text-muted me-4">
                    </div>
                    <div>
                      <h5 className="mb-2 mb-lg-4 fw-bold">Why should you choose JOB FAIR ?</h5>
                      <p className="m-0">It utilizes AI and Machine Learning to automatically provide 
                        personalized content set and accustomed for each client's needs</p>
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
