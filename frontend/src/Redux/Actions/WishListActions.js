import {
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_DETAILS_FAIL,
  WISHLIST_DETAILS_REQUEST,
  WISHLIST_DETAILS_SUCCESS,
  WISHLIST_LIST_FAIL,
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_SUCCESS,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_DELETE_FAIL,
} from "../Constants/WishListConstants";
import axios from "axios";
import { logout } from "./userActions";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";

// CREATE WISHLIST
export const createWishList = (wishList) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/wishlist`, wishList, config);
    dispatch({ type: WISHLIST_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WISHLIST_CREATE_FAIL,
      payload: message,
    });
  }
};

// WISHLIST DETAILS
export const getWishListDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/wishlist/${id}`, config);
    dispatch({ type: WISHLIST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WISHLIST_DETAILS_FAIL,
      payload: message,
    });
  }
};

// DELETE WISHLIST
export const deleteWishList = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: WISHLIST_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/wishlist/${id}`, config);
  
      dispatch({ type: WISHLIST_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: WISHLIST_DELETE_FAIL,
        payload: message,
      });
    }
  };


// LIST WISHLISTS
export const listWishLists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/wishlist/`, config);
    dispatch({ type: WISHLIST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WISHLIST_LIST_FAIL,
      payload: message,
    });
 }
};