// import React from 'react'
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="updates" id="about">
        <form action="https://api.web3forms.com/submit" method="POST">
          <input
            type="hidden"
            name="access_key"
            value="ac691ca3-9abd-45a3-a2a5-1c39bfe387f2"
          />

          <input
            type="email"
            name="email"
            className="form-box"
            placeholder="Enter your email"
            required
          />
          <p id="thanks"></p>
          <button type="submit" className="btn-class">
            Subscribe
          </button>
        </form>

        <p className="update-head">Get Ready for the Updates!</p>
      </div>
      <footer className="footer" id="ftr">
        <div className="col">
          <a href="index.html" className="ftr-links">
            Home
          </a>
          <a href="#service" className="ftr-links">
            Services
          </a>
          <a href="#factor" className="ftr-links">
            X-Factor
          </a>
          <a href="#feed" className="ftr-links">
            Feedback
          </a>
        </div>
        <div className="col">
          <a href="" className="ftr-links">
            <i className="fa-square-facebook"></i>Instargram
          </a>
          <a href="" className="ftr-links">
            Whatsapp
          </a>
          <a href="" className="ftr-links">
            Facebook
          </a>
        </div>
        <div className="col">
          <a href="#services" className="ftr-links">
            Cakes
          </a>
          <a href="#services" className="ftr-links">
            Pasteries
          </a>
          <a href="#services" className="ftr-links">
            Cookies
          </a>
          <a href="#services" className="ftr-links">
            Buns
          </a>
        </div>
        <div className="col">
          <a href="tel: +91 7973789157" className="ftr-links">
            Call Us
          </a>
          <a href="mailto:linkinpardume07@gmail.com" className="ftr-links">
            Mail Us
          </a>
          <a href="Sangrur,Punjab" className="ftr-links">
            Reach Us
          </a>
        </div>
      </footer>
    </>
  );
}
