import {
    RETURN_REQUEST,
    RETURN_SUCCESS,
    RETURN_FAIL,
} from "../Constants/ReturnsConstants";
import axios from "axios";

// RETURN REQUEST
export const returnRequest = (orderId, user) => async (dispatch) => {
    try {
      dispatch({ type: RETURN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `/api/returns`,
        { orderId, user },
        config
      );
      dispatch({ type: RETURN_SUCCESS, payload: data });  
    } catch (error) {
      dispatch({
        type: RETURN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };