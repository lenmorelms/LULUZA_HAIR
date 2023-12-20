import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import AddUser from "./screens/AddUser";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
// import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  const user = JSON.parse(localStorage.getItem('userInfo'));
  // const user = false;
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<PrivateRouter/>} /> */}
          {/* <Route path="/" element={user ? <HomeScreen /> : <Navigate to="/login" replace />} /> */}
          <Route path="/" element={<HomeScreen />} />

          <Route path="/products" element={user ? <ProductScreen /> : <Navigate to="/login" replace />} />
          <Route path="/products/search/:keyword" element={user ? <ProductScreen /> : <Navigate to="/login" replace />} />
          <Route path="products/page/:pagenumber" element={user ? <ProductScreen /> : <Navigate to="/login" replace />} />
          {/* <Route path="/products" element={<ProductScreen />} /> */}

          <Route path="/category" element={user ? <CategoriesScreen /> : <Navigate to="/login" replace />} />
          {/* <Route path="/category" element={<CategoriesScreen />} /> */}

          <Route path="/orders" element={user ? <OrderScreen /> : <Navigate to="/login" replace />} />
          <Route path="/orders/search/:keyword" element={user ? <OrderScreen /> : <Navigate to="/login" replace />} />
          <Route path="orders/page/:pagenumber" element={user ? <OrderScreen /> : <Navigate to="/login" replace />} />
          <Route path="/order/:id" element={user ? <OrderDetailScreen /> : <Navigate to="/login" replace /> } />
          <Route path="/addproduct" element={user ? <AddProduct /> : <Navigate to="/login" replace />} />
          {/* <Route path="/addproduct" element={<AddProduct />} /> */}

          <Route path="/users" element={user ? <UsersScreen /> : <Navigate to="/login" replace />} />
          <Route path="/addusers" element={user ? <AddUser /> : <Navigate to="/login" replace />} />
          <Route path="/users/:id/edit" element={user ? <UserEditScreen /> : <Navigate to="/login" replace />} />
          <Route path="/users/search/:keyword" element={user ? <UsersScreen /> : <Navigate to="/login" replace />} />
          <Route path="users/page/:pagenumber" element={user ? <UsersScreen /> : <Navigate to="/login" replace />} />
          <Route path="/product/:id/edit" element={user ? <ProductEditScreen /> : <Navigate to="/login" replace />} />
          {/* <Route path="/category/:id/edit" element={user ? <CategoriesScreen /> : <Navigate to="/login" replace />} /> */}
          {/* <Route path="/product/:id/edit" element={<ProductEditScreen />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
