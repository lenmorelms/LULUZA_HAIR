import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import WishListScreen from "./screens/WishListScreen";
import NewArrivalScreen from "./screens/NewArrivalScreen";
import BestSellerScreen from "./screens/BestSellerScreen";
import SaleScreen from "./screens/SaleScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import PaymentOptionsScreen from "./screens/PaymentOptionsScreen";
import ReturnsPolicyScreen from "./screens/ReturnsPolicyScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import ReturnsScreen from "./screens/returnsScreen";
import VouchersScreen from "./screens/VouchersScreen";
import PayVoucherScreen from "./screens/PayVoucherScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route path="/category/:category" component={CategoryScreen} exact />
        <Route path="/new" component={NewArrivalScreen} exact />
        <Route path="/best" component={BestSellerScreen} exact />
        <Route path="/sale" component={SaleScreen} exact />
        <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />

        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/wishlist" component={WishListScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />

        <Route path="/about-us" component={AboutUsScreen} exact />
        <Route path="/contact-us" component={ContactUsScreen} exact />
        <Route path="/payment-options" component={PaymentOptionsScreen} exact />
        <Route path="/returns-policy" component={ReturnsPolicyScreen} exact />
        <Route path="/privacy-policy" component={PrivacyPolicyScreen} exact />
        <Route path="/returns" component={ReturnsScreen} exact />
        <Route path="/vouchers" component={VouchersScreen} exact />
        <Route path="/pay-voucher/:id" component={PayVoucherScreen} exact />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
