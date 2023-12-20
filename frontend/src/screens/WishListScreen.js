import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../Redux/Actions/cartActions";
import WhatsAppIcon from "../components/WhatsAppIcon";
// import Message from "../components/LoadingError/Error";
import { deleteWishList, listWishLists } from "../Redux/Actions/WishListActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const WishListScreen = ({ match, location, history }) => {
  // currency state
//   const [currency, setCurrency] = useState(location.state.currency);
//   const [conversionRate, setConversionRate] = useState(1);
//   const [defaultCurrency, setDefaultCurrency] = useState(location.state.defaultCurrency);
// const [showContent, setShowContent] = useState();

  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishLists);
  const { loading, error, wishLists } = wishList;


  useEffect(() => {
    // Currency Conversion
    // if(currency === 'ZAR') setDefaultCurrency('R');
    // else setDefaultCurrency('$');

    // if (currency !== 'ZAR') {
    //   axios.get(`https://api.exchangerate-api.com/v4/latest/ZAR`)
    //     .then(response => {
    //       setConversionRate(response.data.rates[currency]);
    //     });
    //   } else setConversionRate(1);
    dispatch(listWishLists());

  }, [dispatch]);

  // const checkOutHandler = () => {
  //   history.push({
  //     pathname: "/shipping",
  //     state: { currency, defaultCurrency }
  //   })
  // };
//   const handleCurrencyChange = (event) => {
//     setCurrency(event.target.value);
//   };
const wishListHandler = (id) => {
  // e.preventDefault();
  dispatch(deleteWishList(id));
  // alert(id);
}
  return (
    <>
      <Header />
      <WhatsAppIcon />
      {/* <div className="currency-selector">
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="ZAR">ZAR</option>
          <option value="USD">USD</option>
        </select>
      </div> */}
      {/* Cart */}
      {/* Cart Icon */}
    {/* <div className="cart-icon">
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
    </div> */}
      <div className="container">
      {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
        {wishLists.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            You have no wishList
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
              WishList Products
            </div>
            {wishLists.map((wishList, index) => (
                wishList.wishListItems.map(item => {
                  return (
                    <>
                    <div className="cart-iterm row">
                {/* <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div> */}
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
                    disabled
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
                  <h4>{wishList.currency} {(item.price)}</h4>
                </div>
              </div>
              <div className="total">
              <span className="sub">total:</span>
              {/* <span className="total-price">${total}</span> */}
              <span className="total-price">{wishList.currency} {wishList.totalPrice}</span>
              <input type="hidden" id="wishList_id" name="wishList_id" value={wishList._id}></input>
            </div>
              </>
                  );
                })
            ))}
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link 
                to={{
                  pathname: "/",
                  // state: { currency, defaultCurrency }
                }}
                className="col-md-6 "
                >
                <button>Continue To Shopping</button>
              </Link>
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button 
                    className="gold-btn" 
                    // onClick={checkOutHandler}
                    style={{ marginRight: "1rem" }}
                  >Checkout</button>
                  <button 
                    className="gold-btn"
                    onClick={()=> wishListHandler(document.querySelector("#wishList_id").value)}
                    style={{ marginLeft: "1rem", backgroundColor: "#ebb450", color: "#000" }}
                  >Empty WishList</button>
                  {/* <button>Checkout</button> */}
                </div>
            </div>            
            </>
        ) }
        </>
                ) }
      </div>
      </>
  );
};

export default WishListScreen;