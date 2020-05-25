import { CURRENCIES_LIST as CURRENCIES_LIST_ENDPOINT } from '../../utils/api-endpoints';

const LOCAL_CURRENCIES_HOOK = 'currencies_list';

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

function getCurrenciesFromLocal() {
  const list = localStorage.getItem(LOCAL_CURRENCIES_HOOK);

  return list === null ? JSON.parse(list) : list;
}

export function fetchCurrenciesList(saveToLocalStorage = true) {
  return (dispatch) => {
    dispatch(requestCurrenciesList());

    return fetch(CURRENCIES_LIST_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveCurrenciesList(data));

        if (saveToLocalStorage) {
          localStorage.setItem(LOCAL_CURRENCIES_HOOK, JSON.stringify(data));
        }
      });
  };
}

export function getCurrenciesList() {
  const localList = getCurrenciesFromLocal();
  if (localList !== null) return localList;

  return fetchCurrenciesList();
}
