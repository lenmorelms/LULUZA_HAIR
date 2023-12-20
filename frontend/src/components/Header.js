import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";

import { FaSearch } from "react-icons/fa";
import { listCategory } from "../Redux/Actions/CategoryActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {/* Header */}

      {/* PC HEADER */}
      <div className="pc-header">
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <Link className="navbar-brand" to="/" style={{color: "#DFDFDB"}}>
                Luluza hair
              </Link>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
            {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo.fname}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                  <Link to="/login">
                  Login
                  </Link>
                  <Link to="/register">
                  Sign Up
                  </Link>
                  </>
                )}
              {/* Cart */}
              {/* <Link to="/cart">
                <FaShoppingCart />
                <div className="shopping-cart-items">{cartItems.length}</div>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
      <div className="row">
              <div className="col-md-8 col-8 d-flex align-items-center header-nav">

                <div
                  onClick={() => {
                    isCollectionHovered ? setIsCollectionHovered(false) : setIsCollectionHovered(true)
                  }}
                  style={{ transition: "0.5s" }}
                >
                <Link className="header-categories header-collection" id="header_collection" to="#" >
                  Collection
                </Link>
                </div>
                <div>
                <Link className="header-categories" to="/new">
                  New Arrivals
                </Link>
                </div>
                <div>
                <Link className="header-categories" to="/best">
                  Best Seller
                </Link>
                </div>
                <div>
                <Link className="header-categories" to="/sale">
                  Sale
                </Link>
                </div>
                <div>
                <Link className="header-categories" to={localStorage.getItem("userInfo") ? "/wishlist" : "/login"}>
                  WishList
                </Link>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-end Login-Register">
                  <>
                  <form onSubmit={submitHandler} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control rounded search"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search..."
                    style={{ paddingRight: '30px', width: '100%' }} // Make room for the search icon
                  />
                  <FaSearch
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                    onClick={submitHandler}
                  />
                  </form>
                  </>
              </div>
            </div>
            </div>
            </div>
              <div className="container">
                {isCollectionHovered && (
                  <div className="header-hover-container">
                    {categories.map((category) => (
                      <div>
                      <Link className="header-dropdown-link" to={`/category/${category.name}`}>
                        {category.name}
                      </Link>
                      </div>
                    ))}
                  </div>
                )}
                </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-3 d-flex align-items-center">
                  <div className="menu-icon" onClick={() => setIsMobileNavOpen(!isMobileNavOpen) }>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  {/* {isMobileNavOpen ? (
                  <div className="close-icon" onClick={() => setIsMobileNavOpen(false)}>
                    <div className="lineX line1"></div>
                    <div className="lineX line2"></div>
                  </div>
                  ) : (
                    <div className="menu-icon" onClick={() => setIsMobileNavOpen(true)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  )} */}
                  {isMobileNavOpen && (
                    <div className="dropdown">
                      <div
                  onClick={() => {
                    isCollectionHovered ? setIsCollectionHovered(false) : setIsCollectionHovered(true)
                  }}
                  style={{ transition: "0.5s" }}
                >
                <Link className="header-categories mobile-collection" id="header_collection" to="#">
                  Collection
                </Link>
                {isCollectionHovered && (
                  // <div className="header-hover-container">
                  <>
                    {categories.map((category) => (
                      <div>
                      <Link className="header-dropdown-link" to={`/category/${category.name}`}>
                        {category.name}
                      </Link>
                      </div>
                    ))}
                    </>
                  // </div>
                )}
                </div>
                <div>
                <Link className="mobile-categories" to="/new">
                  New Arrivals
                </Link>
                </div>
                <div>
                <Link className="mobile-categories" to="/best">
                  Best Seller
                </Link>
                </div>
                <div>
                <Link className="mobile-categories" to="/sale">
                  Sale
                </Link>
                </div>
                <div>
                <Link className="mobile-categories" to={localStorage.getItem("userInfo") ? "/wishlist" : "/login"}>
                  WishList
                </Link>
                </div>
                    </div>
                  )}

                </div>
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/" style={{color: "#000000"}}>
                    Luluza hair
                  </Link>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link> */}
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

    </div>
  );
};

export default Header