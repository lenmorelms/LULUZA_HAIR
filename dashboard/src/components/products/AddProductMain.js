import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  // Category options
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Image support
  const [newProduct, setNewProduct] = useState({
    name: '',
    categories: '',
    price: 0,
    image: '',
    countInStock: 0,
    description: ''
  });
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  // Category option list
  let optionList = [];
  categories.forEach(element => {
    optionList.push({"value":element.name, "label":element.name});
  });
  // console.log("optionList  :"+JSON.stringify(optionList));

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch] );
  // Image support
  useEffect(() => {
    if(product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setNewProduct({
        name: '',
        categories: '',
        price: 0,
        image: '',
        countInStock: 0,
        description: ''
      });
    }
  }, [product, dispatch]);

  // Image support
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Extract category values
    let productCategories = [];
    newProduct.categories.forEach(cat => {
      productCategories.push(cat.value);
    });
    formData.append('name', newProduct.name);
    formData.append('categories', productCategories);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image);
    formData.append('countInStock', newProduct.countInStock);
    formData.append('description', newProduct.description);
    dispatch(createProduct(formData));
    // alert(productCategories);
  }
  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value});
  }

  const handleSelect = (data) => {
    setSelectedOptions(data);
    setNewProduct({...newProduct, "categories": selectedOptions});
    console.log("SELECTED  :"+JSON.stringify(selectedOptions));
  }

  const handleImage = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.files[0]});
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>    
      <form enctype="multipart/form-data" onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-black text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-gold">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      name="name"
                      value={newProduct.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Product categories
                    </label>
                    <div className="dropdown-container">
                      <Select
                        options={optionList}
                        placeholder="Select categories"
                        name="categories"
                        required
                        // value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      name="price"
                      value={newProduct.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_count_in_stock" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_count_in_stock"
                      required
                      name="countInStock"
                      value={newProduct.countInStock}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="mb-4">
                    <label className="form-label">Coupons</label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_coupons"
                      name="coupons"
                      // value=""
                      // onChange=""
                    />
                  </div> */}
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      name="description"
                      value={newProduct.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Image</label>
                    <input
                      className="form-control mt-3"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      name="image"
                      required
                      onChange={handleImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>


      </section>
    </>
  );
};

export default AddProductMain;
