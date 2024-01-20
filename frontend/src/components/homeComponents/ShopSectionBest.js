import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProductBest } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSectionBest = (props) => {
  const [currency, setCurrency] = useState('ZAR');
  const [defaultCurrency, setDefaultCurrency] = useState('R');
  const [conversionRate, setConversionRate] = useState(1);
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productListBest = useSelector((state) => state.productListBest);
  const { loading, error, products, page, pages } = productListBest;

  useEffect(() => {
    dispatch(listProductBest(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  useEffect(() => {
    if(currency === 'ZAR') setDefaultCurrency('R');
    else setDefaultCurrency('$');

    if (currency !== 'ZAR') {
      axios.get(`https://api.exchangerate-api.com/v4/latest/ZAR`)
        .then(response => {
          setConversionRate(response.data.rates[currency]);
        });
      } else setConversionRate(1);
  }, [currency]);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
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
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          {/* <Link to={`/products/${product._id}`}> */}
                          <Link to= {{
                            pathname: `/products/${product._id}`,
                            state: { currency, defaultCurrency }
                          }}>
                            <div className="shopBack">
                              <img src={`https://luluza-server.onrender.com/images/${product.image}`} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>{defaultCurrency} {(product.price * conversionRate).toFixed(2)}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSectionBest;
