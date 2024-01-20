import React from "react";
import Header from "./../components/Header";
// import CurrencySelector from "../components/CurrencySelector";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Footer from "./../components/Footer";
// import Banner from "../components/homeComponents/Banners";

const PrivacyPolicyScreen = () => {
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      {/* <Banner 
        link="https://luluza-frontend.vercel.app/about-us" 
        imageUrl="https://luluza-server.onrender.com/images/new_arrival.jpg" 
      /> */}
      <div style={{ padding: "2rem" }}>
            <h1>PRIVACY POLICY INFORMATION</h1>
      </div>
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyScreen;