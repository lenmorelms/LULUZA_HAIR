import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";

const UsersScreen = () => {
  const { keyword, pagenumber } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent keyWord={keyword} pageNumber={pagenumber} />
      </main>
    </>
  );
};

export default UsersScreen;
