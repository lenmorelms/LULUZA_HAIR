import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { error: errorDelete, success: successDelete } = categoryDelete;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, successDelete]);
  return (
    <div className="col-md-12 col-lg-8">
      {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
      )}
      {loading ? (
            <Loading />
      ) : error ? (
            <Message variant="alert-danger">{error}</Message>
      ) : (
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Table Data */}
          {categories.map((category) => (
            <Category category={category} key={category._id} />
          ))}
        </tbody>
      </table>
   )}
    </div>
  );
};

export default CategoriesTable;
