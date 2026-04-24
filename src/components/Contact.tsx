import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:sainiaayush970@gmail.com" data-cursor="disable">
                sainiaayush970@gmail.com
              </a>
            </p>

            <h4>Phone</h4>
            <p>+91 9644880659</p>

            <h4>Education</h4>
            <p>B.Tech Computer Science Engineering</p>

            <h4>Social</h4>
            <div className="social-links">
              <a
                href="https://github.com/Aayushsaini2004"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                GitHub <MdArrowOutward />
              </a>

              <a
                href="https://www.linkedin.com/in/aayush-saini-44025527a"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <h2>
            Designed and Developed
            <br />
            by Aayush Saini
          </h2>

          <h5>
            <MdCopyright /> 2026
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;