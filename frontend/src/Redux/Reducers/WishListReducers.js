import {
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_RESET,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_DETAILS_FAIL,
  WISHLIST_DETAILS_REQUEST,
  WISHLIST_DETAILS_SUCCESS,
  WISHLIST_LIST_FAIL,
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_RESET,
  WISHLIST_LIST_SUCCESS,
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
} from "../Constants/WishListConstants";

// CREATE WISHLIST
export const wishListCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_REQUEST:
      return { loading: true };
    case WISHLIST_CREATE_SUCCESS:
      return { loading: false, success: true, wishList: action.payload };
    case WISHLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WISHLIST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// WISHLIST DETAILS
export const wishListDetailsReducer = (
  state = { loading: true, wishListItems: [] },
  action
) => {
  switch (action.type) {
    case WISHLIST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case WISHLIST_DETAILS_SUCCESS:
      return { loading: false, wishList: action.payload };
    case WISHLIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// WISHLIST LIST
export const wishListsReducer = (state = { wishLists: [] }, action) => {
  switch (action.type) {
    case WISHLIST_LIST_REQUEST:
      return { loading: true };
    case WISHLIST_LIST_SUCCESS:
      return { loading: false, wishLists: action.payload };
    case WISHLIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case WISHLIST_LIST_RESET:
      return { wishLists: [] };
    default:
      return state;
  }
};

// DELETE WISHLIST
export const wishListDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case WISHLIST_DELETE_REQUEST:
        return { loading: true };
      case WISHLIST_DELETE_SUCCESS:
        return { loading: false, success: true };
      case WISHLIST_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};