import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { returnRequest } from "../Redux/Actions/returnsActions";

import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { createVoucher } from "../Redux/Actions/VouchersActions";

const VouchersScreen = ({ history }) => {
    const [voucherCurrency, setVoucherCurrency] = useState("ZAR");
    const [paymentMethod, setPaymentMethod] = useState("Paypal");
    const [amount, setAmount] = useState("");
    const [senderName, setSenderName] = useState("");
    const [recipientName, setrecipientName] = useState("");
    const [recipientEmail, setrecipientEmail] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const createGiftVoucher = useSelector((state) => state.createGiftVoucher);
    const { voucher, error, success, loading } = createGiftVoucher;

    useEffect(() => {
        if(!localStorage.getItem("userInfo")) {
            history.push({
                pathname: "/login",
                // state: { currency, defaultCurrency }
              });    
        }
        if(success) {
            history.push({
                pathname: `/pay-voucher/${voucher._id}`,
                state: {
                    voucherCurrency,
                    paymentMethod,
                    amount,
                    senderName,
                    recipientName,
                    recipientEmail,
                    message
                 }
              });
        }
    }, [history, success, voucherCurrency, paymentMethod, amount, senderName, recipientName, recipientEmail, message, voucher]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createVoucher(
            voucherCurrency,
            amount,
            senderName,
            recipientName,
            recipientEmail,
            message
        ));
    }
  return (
    <div>
      <Header />
      <WhatsAppIcon />
      <div style={{ padding: "2rem" }}>
      {error && <Message variant="alert-danger">{error}</Message>}
       {/* {success && <Message variant="alert-success">Return request submited</Message>} */}
        {loading && <Loading />}
            <div>
                <h3 style={{ textAlign: "center", paddingBottom: "2rem" }}>BUY GIFT VOUCHER</h3>
                <div className="row form-center">
                    <div className="col-md-5 col-sm-12">
                        {/* CARD */}
                        <div className="gift-card">
                            {/* <div><p style={{padding: "1rem" }}>{voucherCurrency} {amount}</p></div>
                            <div><h1 style={{ textAlign: "center", color: "#ebb450"}}>LULUZA GIFT CARD</h1></div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                                
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12">
                        <form className="row form-container" onSubmit={submitHandler}>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Select Currency</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <select
                                    className="form-control"
                                    name="currency"
                                    value={voucherCurrency}
                                    onChange={(e) => setVoucherCurrency(e.target.value)}
                                >
                                    <option value="ZAR">ZAR</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Select Payment Method</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <select
                                    className="form-control"
                                    name="payment-method"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="Paypal">PAYPAL</option>
                                    <option value="Payfast">PAYFAST</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Gift Card Amount</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="amount"
                                    min="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Sender Name</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="s_name"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Recipient Name</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="r_name"
                                    value={recipientName}
                                    onChange={(e) => setrecipientName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Recipient Email</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="r_email"
                                    value={recipientEmail}
                                    onChange={(e) => setrecipientEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row form-contact">
                            <div className="col-md-4">
                                <label for="account-fn">Message (100* words)</label>
                            </div>
                            <div className="col-md-8" style={{ margin: "0", padding: "0" }}>
                                <textarea
                                    className="form-control"
                                    value={message}
                                    name="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        <button type="submit" className="round-gold-btn">PAY FOR GIFT VOUCHER</button>
                        </form>
                    </div>
                </div>
            </div>
      </div>
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default VouchersScreen;