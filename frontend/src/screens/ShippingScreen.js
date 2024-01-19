import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";

const ShippingScreen = ({ history, location}) => {
  // currency state
  const [currency/*, setCurrency*/] = useState(location.state.currency);
  // const [conversionRate, setConversionRate] = useState(1);
  const [defaultCurrency/*, setDefaultCurrency*/] = useState(location.state.defaultCurrency);
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // history.push("/payment");
    history.push({
      pathname: "/payment",
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
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default ShippingScreen;
