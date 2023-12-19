import { CURRENCY_CHANGE } from "../Constants/currencyConstants";

export const changeCurrency = (currency) => (dispatch) => {
    dispatch({
        type: CURRENCY_CHANGE,
        payload: currency === "ZAR" ? "USD" : "ZAR",
    });
};