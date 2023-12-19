import React from "react";
import Header from "./../components/Header";
// import CurrencySelector from "../components/CurrencySelector";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import ShopSectionNew from "../components/homeComponents/ShopSectionNew";
import Banner from "../components/homeComponents/Banners";

const NewArrivalScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <Banner 
        link="http://localhost:3000/new" 
        imageUrl="http://localhost:5000/images/new_arrival.jpg" 
      />
      <ShopSectionNew keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default NewArrivalScreen;
