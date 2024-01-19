import {
    RETURNS_REQUEST,
    RETURNS_SUCCESS,
    RETURNS_FAIL,
    RETURNS_COUNT_SUCCESS,
    RETURNS_RESTORE_REQUEST,
    RETURNS_RESTORE_SUCCESS,
    RETURNS_RESTORE_FAIL,
    RETURNS_DETAILS_REQUEST,
    RETURNS_DETAILS_SUCCESS,
    RETURNS_DETAILS_FAIL,
} from "../Constants/ReturnsConstants";
import { logout } from "./userActions";
import axios from "axios";

export const listReturnsCount = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/returns/count`, config);

    dispatch({ type: RETURNS_COUNT_SUCCESS, payload: data });
  } catch(error) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
  }
};

export const listReturns = (keyWord = "", pageNumber = " ") => async (dispatch, getState) => {
    try {
      dispatch({ type: RETURNS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/returns?keyword=${keyWord}&pageNumber=${pageNumber}`, config);
  
      dispatch({ type: RETURNS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: RETURNS_FAIL,
        payload: message,
      });
    }
  };

  // SINGLE RETURN REQUEST
export const listReturnsDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: RETURNS_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/returns/${id}`, config);
      dispatch({ type: RETURNS_DETAILS_SUCCESS, payload: data._id });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: RETURNS_DETAILS_FAIL,
        payload: message,
      });
    }
  };
  // RESTORE ORDER
export const restoreOrder = (returnsId) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETURNS_RESTORE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/returns/${returnsId}`,
      {},
      config
    );
    dispatch({ type: RETURNS_RESTORE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RETURNS_RESTORE_FAIL,
      payload: message,
    });
  }
};