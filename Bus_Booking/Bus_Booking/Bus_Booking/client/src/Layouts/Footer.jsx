import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Tours & Travels</h5>
            <p>Tours & Travels is your one-stop solution for all your travel needs. Explore the world hassle-free with us!</p>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="fa fa-envelope" aria-hidden="true"></i> toursandtravels@gmail.com</li>
              <li><i className="fa fa-phone" aria-hidden="true"></i> +91 9874563210</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><i className="fa fa-facebook"></i> Facebook</li>
              <li><i className="fa fa-twitter"></i> Twitter</li>
              <li><i className="fa fa-instagram"></i> Instagram</li>
            </ul>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="row">
          <div className="col-12 text-center">
            <p>&#169; 2024 Tours & Travels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
