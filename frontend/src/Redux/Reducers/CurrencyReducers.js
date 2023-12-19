import { CURRENCY_CHANGE } from "../Constants/currencyConstants";

export const currencyReducer = (state = { currency: "" }, action ) => {
    switch (action.type) {
        case CURRENCY_CHANGE:
            return { currency: action.payload };
        default: 
            return state;
    };
};