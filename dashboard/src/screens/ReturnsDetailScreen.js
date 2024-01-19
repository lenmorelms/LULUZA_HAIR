import React, { useEffect} from "react";
import { useParams } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import ReturnsDetailmain from "../components/returns/ReturnsDetailMain";
import { useDispatch, useSelector } from "react-redux";
import { listReturnsDetails } from "../Redux/Actions/ReturnsActions";

const ReturnsDetailScreen = () => {
  const { id: orderReturnId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const rid = params.get('rid');


  const dispatch = useDispatch();

  const returnsDetails = useSelector((state) => state.returnsDetails);
  const { returns } = returnsDetails;

  useEffect(()=> {
    dispatch(listReturnsDetails(rid));
  }, [dispatch, rid]);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReturnsDetailmain orderReturnId={orderReturnId} returnsId={returns} />
      </main>
    </>
  );
};

export default ReturnsDetailScreen;
