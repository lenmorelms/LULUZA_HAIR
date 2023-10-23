import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";

const ProductEditScreen = () => {
  // const productId = match.params.id;
  const { id: productId } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
