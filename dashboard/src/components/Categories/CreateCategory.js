import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import { createCategoryItem } from "./../../Redux/Actions/CategoryActions";
import { listCategories } from "./../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });
  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  useEffect(() => {
    if(category) {
      toast.success("Category Added", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setNewCategory({
        name: '',
        description: ''
      });
      // Re-render category list
      dispatch(listCategories());
    }
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(createCategoryItem(newCategory.name, newCategory.description));

    // alert(newCategory.name)
  }

  const handleChange = (e) => {
    setNewCategory({...newCategory, [e.target.name]: e.target.value});
  }

  return (
    <div className="col-md-12 col-lg-4">
      <Toast />
      <form enctype="multipart/form-data" onSubmit={submitHandler}>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="category_name"
            name="name"
            required
            value={newCategory.name}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div> */}
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            name="description"
            required
            value={newCategory.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-gold py-3">Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
