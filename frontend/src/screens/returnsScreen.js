import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { returnRequest } from "../Redux/Actions/returnsActions";

import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const ReturnsScreen = ({ history }) => {
    const [orderId, setOrderId] = useState("");

    const dispatch = useDispatch();

    const returnsRequest = useSelector((state) => state.returnsRequest);
    const { error, success, loading } = returnsRequest;

    useEffect(() => {
        if(!localStorage.getItem("userInfo")) {
            history.push({
                pathname: "/login",
                // state: { currency, defaultCurrency }
              });    
        }
    }, [history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        dispatch(returnRequest(orderId, userInfo._id));
    }
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <div style={{ padding: "2rem" }}>
      {error && <Message variant="alert-danger">{error}</Message>}
       {success && <Message variant="alert-success">Return request submited</Message>}
        {loading && <Loading />}
            <div style={{ textAlign: "center" }}>
                <h3>RETURN ORDER</h3>
                <div className="form-center">
                <form className="row form-container col-md-6 col-sm-10" onSubmit={submitHandler}>
                    <div className="form-contact">
                    <label for="account-fn">Enter your order number stated in your order confirmation</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Order Id"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit" className="round-gold-btn">SEND</button>
                </form>
                </div>
            </div>
      </div>
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default ReturnsScreen;