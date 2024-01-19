import {
    RETURNS_REQUEST,
    RETURNS_SUCCESS,
    RETURNS_FAIL,
    RETURNS_COUNT_SUCCESS,
    RETURNS_COUNT_FAIL,
    RETURNS_COUNT_REQUEST,
    RETURNS_RESTORE_REQUEST,
    RETURNS_RESTORE_SUCCESS,
    RETURNS_RESTORE_FAIL,
    RETURNS_DETAILS_REQUEST,
    RETURNS_DETAILS_SUCCESS,
    RETURNS_DETAILS_FAIL,
} from "../Constants/ReturnsConstants";

export const returnsListCountReducer = (state = { returnsCount: 0 }, action) => {
    switch(action.type) {
      case RETURNS_COUNT_REQUEST:
        return { };
       case RETURNS_COUNT_SUCCESS:
        return { returnsCount: action.payload }
        case RETURNS_COUNT_FAIL:
            return { };
       default:
        return state;
    }
}

export const returnsListReducer = (state = { returns: [] }, action) => {
    switch (action.type) {
      case RETURNS_REQUEST:
        return { loading: true };
      case RETURNS_SUCCESS:
        // return { loading: false, orders: action.payload };
        return {
          loading: false,
          pages: action.payload.pages,
          page: action.payload.page,
          returns: action.payload.returns,
        }
      case RETURNS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
export const listReturnsDetailsReducer = (state = { returns: "" }, action) => {
  switch (action.type) {
    case RETURNS_DETAILS_REQUEST:
      return { }
    case RETURNS_DETAILS_SUCCESS:
      return { returns: action.payload }
    case RETURNS_DETAILS_FAIL:
      return { error: action.payload }
    default:
      return state;
  }
};

export const returnsRestoreOrderReducer = (state = { }, action) => {
  switch (action.type) {
    case RETURNS_RESTORE_REQUEST:
      return { loading: true }
    case RETURNS_RESTORE_SUCCESS:
      return { loading: false, success: true }
    case RETURNS_RESTORE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};