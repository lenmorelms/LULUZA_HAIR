import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/orders/OrderMain";

const OrderScreen = () => {
  const { keyword, pagenumber } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain keyWord={keyword} pageNumber={pagenumber} />
      </main>
    </>
  );
};

export default OrderScreen;
