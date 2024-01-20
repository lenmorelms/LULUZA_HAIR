import { 
    CREATE_VOUCHER_REQUEST,
    CREATE_VOUCHER_SUCCESS,
    CREATE_VOUCHER_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_PAY_REQUEST,
    VOUCHER_PAY_SUCCESS,
    VOUCHER_PAY_FAIL,
    VOUCHER_BUY_REQUEST,
    VOUCHER_BUY_SUCCESS,
    VOUCHER_BUY_FAIL
} from "../Constants/VouchersConstants";
import axios from "axios";
import { login, logout } from "./userActions";

export const createVoucher = (currency, amount, senderName, recipientName, recipientEmail, message) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_VOUCHER_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `https://luluza-server.onrender.com/api/vouchers`,
        { currency, amount, senderName, recipientName, recipientEmail, message },
        config
      );
      dispatch({ type: CREATE_VOUCHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_VOUCHER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// ORDER PAY
export const buyVoucher =
  (voucherId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: VOUCHER_BUY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `https://luluza-server.onrender.com/api/voucher/${voucherId}/buy`,
        paymentResult,
        config
      );
      dispatch({ type: VOUCHER_BUY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: VOUCHER_BUY_FAIL,
        payload: message,
      });
    }
  };
// VOUCER PAY
export const payVoucher = (id, orderId, currency, amount) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `https://luluza-server.onrender.com/api/vouchers/pay`,
      { id, orderId, currency, amount },
      config
    );
    dispatch({ type: VOUCHER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VOUCHER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

// VOUCHER DETAILS
export const getVoucherDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`https://luluza-server.onrender.com/api/vouchers/${id}`, config);
    dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(login());
    }
    dispatch({
      type: VOUCHER_DETAILS_FAIL,
      payload: message,
    });
  }
};