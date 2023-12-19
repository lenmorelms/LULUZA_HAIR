import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import WhatsAppIcon from "../components/WhatsAppIcon";

const PaymentScreen = ({ history, location }) => {
  // currency state
  const [currency, setCurrency] = useState(location.state.currency);
  const [conversionRate, setConversionRate] = useState(1);
  const [defaultCurrency, setDefaultCurrency] = useState(location.state.defaultCurrency);
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  if (!shippingAddress) {
    // history.push("/shipping");
    history.push({
      pathname: "/shipping",
      state: { currency, defaultCurrency }
    });
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // history.push("/placeorder");
    history.push({
      pathname: "/placeorder",
      state: { currency, defaultCurrency }
    });
  };
  return (
    <>
      <Header />
      <WhatsAppIcon />
      {/* Cart Icon */}
    <div className="cart-icon">
    <Link to={{
      pathname: "/cart",
      state: { currency, defaultCurrency }
      }}
    >
        <div>
          <div className="shopping-cart-items">
            <FaShoppingCart />
            <p>{cartItems.length}</p>
          </div>
        </div>
     </Link>
    </div>
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="payment-method"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>

          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="payment-method"
                value="PayFast"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayFast</label>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
