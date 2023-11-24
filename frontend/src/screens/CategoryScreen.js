import React from "react";
import Header from "./../components/Header";
import ShopCategorySection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";

const CategoryScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const category = match.params.category;
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <ShopCategorySection category={category} keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default CategoryScreen;
