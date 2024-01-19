import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <h5>Account</h5>
            <ul>
              <li><a href="/profile">Account Details</a></li>
              <li><a href="/wishlist">Whishlist</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/vouchers">Buy Gift Vouchers</a></li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
        <div className="box-info">
            <h5>Luluza</h5>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/payment-options">Payment Options</a></li>
              <li><a href="/returns-policy">Returns Policy</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
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
