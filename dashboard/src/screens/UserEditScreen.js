import React from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditUserMain from "./../components/users/EditUserMain";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  return (
    <>
    <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUserMain userId={userId} />
      </main>
    </>
  );
};

export default UserEditScreen;
