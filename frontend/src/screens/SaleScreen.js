import React from "react";
import Header from "./../components/Header";
// import CurrencySelector from "../components/CurrencySelector";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import ShopSectionSale from "../components/homeComponents/ShopSectionSale";
import Banner from "../components/homeComponents/Banners";

const SaleScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <Banner 
        link="https://luluza-frontend.vercel.app/sale" 
        imageUrl="https://luluza-server.onrender.com/images/sale.jpg" 
      />
      <ShopSectionSale keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default SaleScreen;
