import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Message from "../components/LoadingError/Error";
import { createWishList } from "../Redux/Actions/WishListActions";
import { WISHLIST_CREATE_RESET } from "../Redux/Constants/WishListConstants";
import Loading from "../components/LoadingError/Loading";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";

const CartScreen = ({ match, location, history }) => {
  // currency state
  const [currency, setCurrency] = useState(location.state.currency);
  const [conversionRate, setConversionRate] = useState(1);
  const [defaultCurrency, setDefaultCurrency] = useState(location.state.defaultCurrency);

  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishListCreate = useSelector((state) => state.wishListCreate);
  const { /* wishList, */ success, error, loading } = wishListCreate;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const total = (cartItems.reduce((a, i) => a + i.qty * i.price, 0) * conversionRate).toFixed(2);

  useEffect(() => {
    if(!localStorage.getItem("userInfo")) {
      history.push({
        pathname: "/login",
        // state: { currency, defaultCurrency }
      });
    }
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // Currency Conversion
    if(currency === 'ZAR') setDefaultCurrency('R');
    else setDefaultCurrency('$');

    if (currency !== 'ZAR') {
      axios.get(`https://api.exchangerate-api.com/v4/latest/ZAR`)
        .then(response => {
          setConversionRate(response.data.rates[currency]);
        });
      } else setConversionRate(1);

      if (success) {
        history.push(`/`);
        dispatch({ type: WISHLIST_CREATE_RESET });
      }
  }, [dispatch, history, productId, qty, currency, success]);

  const checkOutHandler = () => {
    // history.push("/login?redirect=shipping");
    history.push({
      pathname: "/shipping",
      state: { currency, defaultCurrency }
    })
  };

  const wishListHandler = (e) => {
    e.preventDefault();
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2);
    // console.log(">>>> "+(cart.totalPrice* conversionRate).toFixed(2));
    dispatch(
      createWishList({
        wishListItems: cartItems,
        quantity: cartItems.length,
        currency: currency,
        itemsPrice: (cart.itemsPrice * conversionRate).toFixed(2),
        shippingPrice: (cart.shippingPrice * conversionRate).toFixed(2),
        taxPrice: (cart.taxPrice * conversionRate).toFixed(2),
        totalPrice: (cart.totalPrice * conversionRate).toFixed(2),
      })
    );
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      <Header />
      <WhatsAppIcon />
      <div className="currency-selector">
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="ZAR">ZAR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      {/* Cart */}
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
      <div className="container">
        {/* OPENING */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
        <>
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
              
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRICE</h6>
                  {/* <h4>${item.price}</h4> */}
                  <h4>{defaultCurrency} {(item.price * conversionRate).toFixed(2)}</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              {/* <span className="total-price">${total}</span> */}
              <span className="total-price">{defaultCurrency} {total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link 
                to={{
                  pathname: "/",
                  state: { currency, defaultCurrency }
                }}
                className="col-md-6 "
                >
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button 
                    className="gold-btn" 
                    onClick={checkOutHandler}
                    style={{ marginRight: "1rem" }}
                  >Checkout</button>
                  <button 
                    className="gold-btn"
                    onClick={wishListHandler}
                    style={{ marginLeft: "1rem", backgroundColor: "#ebb450", color: "#000" }}
                  >Add To WishList</button>
                  {/* <button>Checkout</button> */}
                </div>
                
              )}
            </div>
            {error && (
                  <div className="my-3 col-12">
                    <Message variant="alert-danger">{error}</Message>
                  </div>
                )}
          </>
        )}
        {/* CLOSSING */}
        </>
        )}
      </div>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default CartScreen;
