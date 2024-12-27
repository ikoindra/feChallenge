import React from "react";

const FooterSection = () => (
  <div id="footer" className="footer container my-5 pt-lg-5">
    <div className="row align-items-start">
      <div className="col-lg-4 mt-lg-3 d-flex flex-column justify-content-start">
        <p className="mb-3">
          Jalan Suroyo No. 161 Mayangan Kota <br /> Probolinggo 672000
        </p>
        <p className="mb-3">binarcarrental@gmail.com</p>
        <p className="mb-0">081-233-334-808</p>
      </div>

      <div
        className="col-lg-2 mt-3 d-flex flex-column justify-content-start"
        style={{ fontWeight: "bold" }}
      >
        <a className="footer-link" href="#our-services">
          Our Services
        </a>
        <a className="footer-link mt-2" href="#why-us">
          Why Us
        </a>
        <a className="footer-link mt-2" href="#testimonial">
          Testimonial
        </a>
        <a className="footer-link mt-2" href="#frequent">
          FAQ
        </a>
      </div>

      <div className="col-lg-3 mt-3 d-flex flex-column justify-content-start">
        <p className="mb-2">Connect with Us</p>
        <div className="d-flex justify-content-start align-items-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="me-3"
          >
            <img
              src="/icon_facebook.png"
              className="img-fluid"
              alt="Facebook"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="me-3"
          >
            <img
              src="/icon_instagram.png"
              className="img-fluid"
              alt="Instagram"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="me-3"
          >
            <img src="/icon_twitter.png" className="img-fluid" alt="Twitter" />
          </a>
          <a
            href="mailto:binarcarrental@gmail.com"
            className="me-3"
            aria-label="Mail"
          >
            <img src="/icon_mail.png" className="img-fluid" alt="Mail" />
          </a>
          <a
            href="https://twitch.tv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitch"
            className="me-3"
          >
            <img src="/icon_twitch.png" className="img-fluid" alt="Twitch" />
          </a>
        </div>
      </div>

      <div className="col-lg-3 mt-3 d-flex flex-column justify-content-start">
        <p className="mb-2">Copyright Binar 2022</p>
        <p
          className="footer-brand"
          style={{
            color: "#0D28A6",
            fontFamily: "Helvetica",
            fontWeight: "bold",
          }}
        >
          Binar Rental
        </p>
      </div>
    </div>
  </div>
);

export default FooterSection;
