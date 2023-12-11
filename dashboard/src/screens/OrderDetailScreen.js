import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";

const OrderDetailScreen = () => {
  // const orderId = match.params.id;
  const { id: orderId } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
