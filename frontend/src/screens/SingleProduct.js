import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";

const SingleProduct = ({ history, match, location }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // currency state
  const [currency, setCurrency] = useState(location.state.currency);
  const [conversionRate, setConversionRate] = useState(1);
  const [defaultCurrency, setDefaultCurrency] = useState(location.state.defaultCurrency);

  const productId = match.params.id;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));

    // Currency Conversion
    if(currency === 'ZAR') setDefaultCurrency('R');
    else setDefaultCurrency('$');

    if (currency !== 'ZAR') {
      axios.get(`https://api.exchangerate-api.com/v4/latest/ZAR`)
        .then(response => {
          setConversionRate(response.data.rates[currency]);
        });
      } else setConversionRate(1);
  }, [dispatch, productId, successCreateReview, currency]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    // history.push(`/cart/${productId}?qty=${qty}`);
    if(localStorage.getItem("userInfo")) {
      history.push({
        pathname: `/cart/${productId}?qty=${qty}`,
        state: { currency, defaultCurrency }
      })
    } else {
      history.push({
        pathname: "/login",
        // state: { currency, defaultCurrency }
      });
    }
    // history.push({
    //   pathname: `/cart/${productId}?qty=${qty}`,
    //   state: { currency, defaultCurrency }
    // });    
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      <Header />
      <WhatsAppIcon />
      {/* Currency Converter */}
    <div className="currency-selector">
      <select value={currency} onChange={handleCurrencyChange}>
        <option value="ZAR">ZAR</option>
        <option value="USD">USD</option>
      </select>
    </div>
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
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={`https://luluza-server.onrender.com/images/${product.image}`} alt={product.name} />
                </div>
                <div className="gallery-images">
                  {product.gallery.map((gal, index) => {
                  return <img key={index} src={`https://luluza-server.onrender.com/images/${gal.filename}`} alt={product.name} />
                })}
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>{defaultCurrency} {(product.price * conversionRate).toFixed(2)}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.countInStock > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>unavailable</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="cart-action-buttons-div">
                        <button
                          onClick={AddToCartHandle}
                          className="round-gold-btn"
                        >
                          Add To Cart
                        </button>
                        {/* <button
                          onClick="{AddToCartHandle}"
                          className="round-gold-btn"
                        >
                          Add To Wishlist
                        </button> */}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A REVIEW</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white hover-gold"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>{" "}
                      to write a review{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default SingleProduct;
