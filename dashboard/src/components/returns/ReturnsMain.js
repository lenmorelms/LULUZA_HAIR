import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Returns from "./Returns";
import { listReturns } from "../../Redux/Actions/ReturnsActions";
import Pagination from "../Home/Pagination";

const ReturnsMain = (props) => {
  const [keyword, setKeyword] = useState();
  const { keyWord, pageNumber } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const returnsList = useSelector((state) => state.returnsList);
  const { loading, error, returns, page, pages } = returnsList;

  useEffect(() => {
    dispatch(listReturns(keyWord, pageNumber));
  }, [dispatch, keyWord, pageNumber]);

  const searchHandler = (e) => {
    e.preventDefault();
    // if (keyword.trim() === ""){
    //   return null;
    // } else {
    //   if (keyword.trim()) {
    //     navigate(`/returns/search/${keyword}`);
    //   } else {
    //     navigate("/returns");
    //   }
      navigate(`/returns`);
    // }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Return Requests</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
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
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Returns returns={returns} />
            )}
            <Pagination
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
              source="returns"
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnsMain;
