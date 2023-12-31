import React from "react";
import Header from "./../components/Header";
import ShopSectionCategory from "./../components/homeComponents/ShopSectionCategory";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import WhatsAppIcon from "../components/WhatsAppIcon";

const CategoryScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const category = match.params.category;
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <ShopSectionCategory category={category} keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default CategoryScreen;
