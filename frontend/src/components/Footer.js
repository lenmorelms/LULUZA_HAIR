import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        <div className="card-name">
          <img
            alt="mastercard"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="visa"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          />
        </div>
        <div className="card-name">
          <img
            alt="paypal"
            src="https://wallpapers.com/images/hd/paypal-name-in-black-background-d8hhd39qupwqemgx.jpg"
          />
        </div>
        <div className="card-name">
          <img
            alt="payfast"
            src="https://payfast.io/wp-content/uploads/2022/11/payfast-logo.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
