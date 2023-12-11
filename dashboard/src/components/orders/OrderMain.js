import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { listOrders } from "../../Redux/Actions/OrderActions";
import Pagination from "../Home/Pagination";

const OrderMain = (props) => {
  const [keyword, setKeyword] = useState();
  const { keyWord, pageNumber } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  useEffect(() => {
    dispatch(listOrders(keyWord, pageNumber));
  }, [dispatch, keyWord, pageNumber]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === ""){
      return null;
    } else {
      if (keyword.trim()) {
        navigate(`/orders/search/${keyword}`);
      } else {
        navigate("/orders");
      }
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              {/* <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              /> */}
              <form onSubmit={searchHandler} style={{ position: 'relative' }}>
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
                    onClick={searchHandler}
                  />
                  </form>
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div> */}
          </div>
        </header>
        <div className="card-body">
          {console.log("page :"+page)}
          {console.log("pages :"+pages)}
          {console.log("orders :"+orders)}
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
            <Pagination
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
              source="orders"
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
