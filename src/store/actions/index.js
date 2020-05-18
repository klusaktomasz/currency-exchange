import { CURRENCIES_LIST as CURRENCIES_LIST_ENDPOINT } from '../../utils/api-endpoints';

export const REQUEST_CURRENCIES_LIST = 'REQUEST_CURRENCIES_LIST';
function requestCurrenciesList() {
  return {
    type: REQUEST_CURRENCIES_LIST,
  };
}
export const RECEIVE_CURRENCIES_LIST = 'RECEIVE_CURRENCIES_LIST';
function receiveCurrenciesList(currencies) {
  return {
    type: RECEIVE_CURRENCIES_LIST,
    currencies,
    lastUpdated: Date.now(),
  };
}

export function fetchCurrenciesList() {
  return function (dispatch) {
    dispatch(requestCurrenciesList());

    return fetch(CURRENCIES_LIST_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveCurrenciesList(data));
      });
  };
}
