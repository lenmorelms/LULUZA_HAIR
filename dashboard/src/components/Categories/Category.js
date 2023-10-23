import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../Redux/Actions/CategoryActions";

const Category = (props) => {
  const { category } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <>
      <tr>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </td>
            <td>#</td>
            <td>
              <b>{category.name}</b>
            </td>
            <td>{category.description}</td>
            <td className="text-end">
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  {/* <Link className="dropdown-item" to={`/category/${category._id}/edit`}>
                    Edit info
                  </Link> */}
                  <Link className="dropdown-item text-danger" to="#" onClick={() => deletehandler(category._id)}>
                    Delete
                  </Link>
                </div>
              </div>
            </td>
          </tr>
    </>
  );
};

export default Category;
