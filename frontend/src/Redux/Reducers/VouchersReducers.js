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
    VOUCHER_BUY_FAIL,
    VOUCHER_BUY_RESET
} from "../Constants/VouchersConstants";

// CREATE VOUCHER REDUCER
export const createVoucherReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_VOUCHER_REQUEST:
        return { loading: true };
      case CREATE_VOUCHER_SUCCESS:
        return { loading: false, success: true, voucher: action.payload };
      case CREATE_VOUCHER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};
// VOUCHER BUY
export const buyVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case VOUCHER_BUY_REQUEST:
      return { loading: true };
    case VOUCHER_BUY_SUCCESS:
      return { loading: false, success: true };
    case VOUCHER_BUY_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_BUY_RESET:
      return {};
    default:
      return state;
  }
};

// PAY USING VOUCHER REDUCER
export const payVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case VOUCHER_PAY_REQUEST:
      return { loading: true };
    case VOUCHER_PAY_SUCCESS:
      return { loading: false, success: true };
    case VOUCHER_PAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// VOUCHER DETAILS
export const voucherDetailsReducer = (
  state = { loading: true, voucherItems: {} },
  action
) => {
  switch (action.type) {
    case VOUCHER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case VOUCHER_DETAILS_SUCCESS:
      return { loading: false, voucher: action.payload };
    case VOUCHER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};