import React, { useEffect,/*, useState*/ 
useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import Header from "./../components/Header";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { getVoucherDetails } from "../Redux/Actions/VouchersActions";
import { PayPalButton } from "react-paypal-button-v2";

const PayVoucherScreen = ({ match, history, location }) => {
  const [selectedPaymentMethod] = useState(location.state.paymentMethod);
  window.scrollTo(0, 0);
  const voucherId = match.params.id;
  const dispatch = useDispatch();

  const voucherDetails = useSelector((state) => state.voucherDetails);
  const { voucher, error, loading } = voucherDetails;

  if(!location.state.voucherCurrency || !location.state.amount) {
    history.push({
        pathname: "/vouchers",
      });
  }

  useEffect(() => {
    dispatch(getVoucherDetails(voucherId));
  }, [dispatch, voucherId]);
//   const voucherData = {
//     currency: location.state.voucherCurrency,
//     paymentMethod: location.state.paymentMethod,
//     amount: location.state.amount,
//     senderName: location.state.senderName,
//     recipientName: location.state.recipientName,
//     recipientEmail: location.state.recipientEmail,
//     message: location.state.message,
//   }
  return (
    <>
      <Header />
      <div className="container">
      {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
          <div className="row pay-voucher-row">
            <div className="col-md-6">Currency</div>
            <div className="col-md-6">{voucher.currency}</div>
          </div>

          <div className="row pay-voucher-row">
            <div className="col-md-6">Amount</div>
            <div className="col-md-6">{voucher.amount}</div>
          </div>

          <div className="row pay-voucher-row">
            <div className="col-md-6">Sender</div>
            <div className="col-md-6">{voucher.senderName}</div>
          </div>

          <div className="row pay-voucher-row">
            <div className="col-md-6">Recipient</div>
            <div className="col-md-6">{voucher.recipientName}</div>
          </div>

          <div className="row pay-voucher-row">
            <div className="col-md-6">Recipient Email</div>
            <div className="col-md-6">{voucher.recipientEmail}</div>
          </div>

          <div className="row pay-voucher-row">
            <div className="col-md-6">Message</div>
            <div className="col-md-6">{voucher.message}</div>
          </div>
          </>
        )}
        {selectedPaymentMethod === "Paypal" ? (
          !voucher.isPaid && (
                
            <div className="col-3" style={{ padding: "2rem" }}>
              <PayPalButton />
            </div>
          )
        ) : (
          selectedPaymentMethod === "Payfast" ? (
            !voucher.isPaid && (
                
              <div className="col-3" style={{ padding: "2rem" }}>
                <button className="btn round-gold-btn">PayFast</button>
              </div>
            )
          ) : (
            !voucher.isPaid && (
              <div>Select Payment Method</div>
            )
          )
        )}
      </div>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default PayVoucherScreen;