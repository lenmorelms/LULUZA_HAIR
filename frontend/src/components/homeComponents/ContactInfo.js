import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <h5>Account</h5>
            <ul>
              <li><a href="https://www.google.com/">Account Details</a></li>
              <li><a href="https://www.google.com/">Whishlist</a></li>
              <li><a href="https://www.google.com/">Returns & Exchanges</a></li>
              <li><a href="https://www.google.com/">Buy Gift Vouchers</a></li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
        <div className="box-info">
            <h5>Luluza</h5>
            <ul>
              <li><a href="https://www.google.com/">About Us</a></li>
              <li><a href="https://www.google.com/">Contact Us</a></li>
              <li><a href="https://www.google.com/">Payment Options</a></li>
              <li><a href="https://www.google.com/">Returns Policy</a></li>
              <li><a href="https://www.google.com/">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <span><a href="https://www.google.com/"><img src="https://superbalist.com/public/images/social/facebook-vector-2021.svg" alt="facebook" /></a></span>
              <span><a href="https://www.google.com/"><img src="https://superbalist.com/public/images/social/instagram-vector-2021.svg" alt="instagram" /></a></span>
              <span><a href="https://www.google.com/"><img src="https://superbalist.com/public/images/social/twitter-vector-2021.svg" alt="twitter" /></a></span>
              <span><a href="https://www.google.com/"><img src="https://superbalist.com/public/images/social/youtube-vector-2021.svg" alt="youtube" /></a></span>
            </div>
            <div className="footer-image">
              <img src="http://localhost:5000/images/footer_logo_2.png" alt="Logo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
