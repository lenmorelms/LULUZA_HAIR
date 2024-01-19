import {
    RETURN_REQUEST,
    RETURN_SUCCESS,
    RETURN_FAIL,
} from "../Constants/ReturnsConstants";

// RETURN REQUEST
export const returnsReducer = (state = {}, action) => {
    switch (action.type) {
      case RETURN_REQUEST:
        return { loading: true };
      case RETURN_SUCCESS:
        return { loading: false, success: true };
      case RETURN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };