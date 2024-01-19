import React from "react";
import Header from "../components/Header";
import Sidebar from "./../components/sidebar";
import ReturnsMain from "../components/returns/ReturnsMain";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
    const { keyword, pagenumber } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReturnsMain keyWord={keyword} pageNumber={pagenumber} />
      </main>
    </>
  );
};

export default HomeScreen;
