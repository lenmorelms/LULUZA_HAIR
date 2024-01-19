import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
  productListCategoryReducer,
  productListNewReducer,
  productListBestReducer,
  productListSaleReducer,
} from "./Reducers/ProductReducers";
import { categorytListReducer } from "./Reducers/CategoryReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import { returnsReducer } from "./Reducers/returnsReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./Reducers/OrderReducres";
import { 
  wishListCreateReducer,
  wishListDetailsReducer,
  wishListsReducer,
  wishListDeleteReducer,
} from "./Reducers/WishListReducers";
import { currencyReducer } from "./Reducers/CurrencyReducers";
import { buyVoucherReducer, createVoucherReducer, payVoucherReducer, voucherDetailsReducer } from "./Reducers/VouchersReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productListCategory: productListCategoryReducer,
  productListNew: productListNewReducer,
  productListBest: productListBestReducer,
  productListSale: productListSaleReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  categoryList: categorytListReducer,
  cart: cartReducer,
  currency: currencyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  returnsRequest: returnsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  wishListCreate: wishListCreateReducer,
  wishListDetails: wishListDetailsReducer,
  wishLists: wishListsReducer,
  wishListDelete: wishListDeleteReducer,
  createGiftVoucher: createVoucherReducer,
  voucherDetails: voucherDetailsReducer,
  buyVoucher: buyVoucherReducer,
  payVoucher: payVoucherReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// currency
const currency = "USD";

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },

  currency: { currencySymbol: currency },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
