import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* EDUCATION */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Computer Science Engineering</h4>
                <h5>Mandsaur University</h5>
              </div>
              <h3>2023 - 2027</h3>
            </div>
            <p>
              Currently pursuing B.Tech in Computer Science Engineering
              with a CGPA of 8.3. Focusing on programming, problem solving,
              and building practical real-world projects to strengthen
              core technical skills.
            </p>
          </div>

          {/* CODELEVATE INTERNSHIP */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Codelevate</h5>
              </div>
              <h3>Jan 2024 - Feb 2024</h3>
            </div>
            <p>
              Built responsive frontend components using React.js,
              improved UI performance, and debugged/optimized web applications.
              Worked with JavaScript, React Hooks, and Git in a
              professional development environment.
            </p>
          </div>

          {/* HELBHARAT INTERNSHIP */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>Helbharat</h5>
              </div>
              <h3>Mar 2024 - Apr 2024</h3>
            </div>
            <p>
              Gained practical development exposure and hands-on experience
              with real-world web development workflows and best practices.
            </p>
          </div>

          {/* CERTIFICATIONS */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications</h4>
                <h5>Codelevate & TCS ION</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed Web Development Internship certification from Codelevate
              and TCS ION - Introduction to Corporate Actions certification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;