import React, { useState } from "react";
import Header from "./../components/Header";
// import CurrencySelector from "../components/CurrencySelector";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Footer from "./../components/Footer";
// import Banner from "../components/homeComponents/Banners";

const ContactUsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Send Email")
  }
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <div style={{ padding: "2rem" }} className="row">
      <h2 style={{ textAlign: "center" }}>Contact Us</h2>
        <div className="col-md-4">
            {/* <h2>Contact Us</h2> */}
            <p>Contact Information*</p>
        </div>
        <div className="col-md-8">
            {/* <h2>Contact Us</h2> */}
            <form className="form-container" onSubmit={submitHandler}>
             <div className="">
              <div className="form-contact">
               <label for="account-fn">Name</label>
               <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
              <div className="form-contact">
               <label for="account-email">Email</label>
               <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="form-contact">
                    <label for="account-message">Message</label>
                    <textarea 
                        className="form-control" 
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} 
                        required
                    ></textarea>
                </div>
                <button type="submit" className="round-gold-btn">SEND</button>
             </div>
            </form>
        </div>
      </div>
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default ContactUsScreen;