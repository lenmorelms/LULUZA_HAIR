import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";

const ProductScreen = () => {
  // const keyword = match.params.keyword;
  // const pagenumber = match.params.pagenumber;
  const { keyword, pagenumber } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts keyWord={keyword} pageNumber={pagenumber} />
      </main>
    </>
  );
};

export default ProductScreen;
