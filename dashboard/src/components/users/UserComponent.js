import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../Home/Pagination";
import { deleteUser } from "../../Redux/Actions/userActions";

const UserComponent = (props) => {
  const [keyword, setKeyword] = useState();
  const { keyWord, pageNumber } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUser(keyWord, pageNumber));
  }, [dispatch, keyWord, pageNumber, successDelete]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === ""){
      return null;
    } else {
      if (keyword.trim()) {
        navigate(`/users/search/${keyword}`);
      } else {
        navigate("/users");
      }
    }
  };
  const editHandler = (id) => {
    navigate(`/users/${id}/edit`)
  }
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="/addusers" className="btn btn-gold">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              {/* <input
                type="text"
                placeholder="Search..."
                className="form-control"
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
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div> */}
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users && users.map((user) => (
                  <div className="col" key={user._id}>
                    {/* <Link to={`/users/${user._id}/edit`} className=""> */}
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        <p><b>{user.fname} {user.lname}</b></p>                  
                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                        {user.isAdmin === true ? (
                          <h6 className="m-0">Admin</h6>
                        ) : (
                          <h6 className="m-0">Customer</h6>
                        )}
                      </div>
                      <div className="card-title mt-2">
                        <button className="btn btn-warning" style={{ margin: "0.5rem" }} onClick={()=>editHandler(user._id)}>Edit</button>
                        <button className="btn btn-danger" style={{ margin: "0.5rem" }} onClick={()=>deleteHandler(user._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                  </div>
              ))}
            </div>
          )}
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
            source="users"
          />
          {/* nav */}
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

export default UserComponent;
