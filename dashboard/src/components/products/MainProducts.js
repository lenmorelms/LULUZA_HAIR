import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../Home/Pagination";

const MainProducts = (props) => {
  const [keyword, setKeyword] = useState();
  const { keyWord, pageNumber } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts(keyWord, pageNumber));
  }, [dispatch, successDelete, keyWord, pageNumber]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === ""){
      return null;
    } else {
      if (keyword.trim()) {
        navigate(`/products/search/${keyword}`);
      } else {
        navigate("/products");
      }
    }
    // if (keyword.trim()) {
    //   navigate(`/products/search/${keyword}`);
    // } else {
    //   navigate("/products");
    // }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-gold">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              {/* <input
                type="search"
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
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div> */}
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products && products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
              {console.log(`RRRRRRRRR: ${products}`)}
            </div>
          )}
          {/* Pagination */}
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
            source="products"
          />

          {/* <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
