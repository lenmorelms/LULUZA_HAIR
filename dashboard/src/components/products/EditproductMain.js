import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
// import { event } from "jquery";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [image, setImage] = useState("");
  // const [countInStock, setCountInStock] = useState(0);
  // const [description, setDescription] = useState("");
  // product coupons
  const [items, setItems] = useState([{ element: '', value: '' }]);
  // product gallery
  const [gallery, setGallery] = useState([]);
  // track if image is changed
  const [trackImage, setTrackImage] = useState(false);
  // edited product
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: 0,
    image: '',
    countInStock: 0,
    description: '',
    coupons: items,
    gallery: gallery
  });

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        // setName(product.name);
        // setDescription(product.description);
        // setCountInStock(product.countInStock);
        // setImage(product.image);
        // setPrice(product.price);
        setEditedProduct({
          name: product.name,
          price: product.price,
          image: product.image,
          countInStock: product.countInStock,
          description: product.description,
          coupons: product.coupons,
          gallery: product.gallery
        });
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('_id', productId);
    // formData.append('name', editedProduct.name);
    // formData.append('price', editedProduct.price);
    // formData.append('countInStock', editedProduct.countInStock);
    // formData.append('description', editedProduct.description);
    // formData.append('image', editedProduct.image);
    // formData.append('coupons', items);
    // formData.append('gallery', gallery);

    const formData = {
      '_id': productId,
      'name': editedProduct.name,
      'price': editedProduct.price,
      'countInStock': editedProduct.countInStock,
      'description': editedProduct.description,
      'image': editedProduct.image,
      'coupons': items,
      'gallery': gallery,
    }
    dispatch(updateProduct(formData));
    // alert(typeof formData.image);
  };
  // onChange events
  const handleChange = (e) => {
    setEditedProduct({...editedProduct, [e.target.name]: e.target.value});
  }
  const handleImage = (e) => {
    setEditedProduct({...editedProduct, [e.target.image]: e.target.files[0]});
    setTrackImage(true);
  }
  // Adding coupon functions
  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    setItems([...items, { element: '', value: '' }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };
  // Product gallery
  const maxImages = 5;
  const handleGalleryChange = (e) => {
    if (e.target.files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images`);
    } else {
      setGallery([...e.target.files]);
    }
  };
  // const handleRemoveGallery = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form enctype="multipart/form-data" onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-black text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
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
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          name="name"
                          required
                          value={editedProduct.name}
                          onChange={handleChange}
                        />
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
                          name="price"
                          required
                          value={editedProduct.price}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_coupons" className="form-label">
                          Add coupons
                        </label>
                        <div>
                        {items.map((item, index) => (
                        <div key={index}>
                        <div className="flex-container">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={index}
                            name="element"
                            value={item.element}
                            onChange={event => handleInputChange(index, event)}
                          />
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Coupon Sale Percentage"
                            name="value"
                            value={item.value}
                            onChange={event => handleInputChange(index, event)}
                          />
                          <button type="button" className="btn btn-danger" onClick={() => handleRemoveClick(index)}>Delete</button>
                        </div>
                        </div>
                        ))}
                        <button type="button" className="btn btn-gold" onClick={handleAddClick}>Add</button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          name="countInStock"
                          required
                          value={editedProduct.countInStock}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          name="description"
                          required
                          value={editedProduct.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Change Image</label>
                        <input
                          className="form-control mt-3"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          name="image"
                          value={editProduct.image}
                          onChange={handleImage}
                        />
                        {trackImage ?
                        <div></div>
                        :
                        <img 
                          src={`http://localhost:5000/images/${editedProduct.image}`}
                          alt={`img-${editedProduct.image}`}
                          style={{ width: '150px' }} // You can set the dimensions as you want
                        />
                        }
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Product gallery <span style={{color: "red"}}>Upoad not more than 5</span></label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryChange}
                        />
                        {/* <button onClick={() => handleRemoveImage(index)}>Delete</button> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        {gallery.length > 0 && (
        <div className="product-gallery">
          {Array.from(gallery).map((image, index) => (
            <>
            <img 
              src={URL.createObjectURL(image)}
              alt={`img-${index}`}
              key={index}
              style={{ width: '150px' }} // You can set the dimensions as you want
            />
            </>
          ))}
        </div>
      )}
      </section>
    </>
  );
};

export default EditProductMain;