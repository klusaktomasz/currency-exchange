import { createSlice } from '@reduxjs/toolkit';
import { CURRENCIES_LIST as CURRENCIES_LIST_API } from '../../utils/api-endpoints';

const CURRENCIES_LIST_LOCAL_HOOK = 'currencies_list';

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    error: false,
    isFetching: false,
    list: {},
  },
  reducers: {
    setFetchingError: (state, action) => {
      state.error = action.payload;
    },
    setFetchingState: (state, action) => {
      state.isFetching = action.payload;
    },
    saveListToLocalStorage: (state, action) => {
      const dataItem = {
        list: action.payload,
        createdAt: Date.now(),
      };

      localStorage.setItem(
        CURRENCIES_LIST_LOCAL_HOOK,
        JSON.stringify(dataItem)
      );
    },
    update: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  update,
  setFetchingState,
  setFetchingError,
  saveListToLocalStorage,
} = currenciesSlice.actions;

export const getCurrenciesFromLocalStorage = () => (dispatch) => {
  const dataHook = localStorage.getItem(CURRENCIES_LIST_LOCAL_HOOK);

  if (dataHook === null) {
    return false;
  }

  const data = JSON.parse(dataHook);
  // Don't update list if it's one day old (1000 * 60 * 60 * 24 - one day in ms).
  if (data.createdAt + 1000 * 60 * 60 * 24 < Date.now()) {
    return false;
  }

  dispatch(update(data.list));
  return true;
};

export const fetchCurrenciesList = () => async (dispatch) => {
  dispatch(setFetchingState(true));

  try {
    const res = await fetch(CURRENCIES_LIST_API);
    const data = await res.json();

    dispatch(update(data));
    dispatch(saveListToLocalStorage(data));
  } catch (e) {
    dispatch(setFetchingError(true));
    console.error(e);
  }

  dispatch(setFetchingState(false));
};

export const getCurrenciesList = () => (dispatch) => {
  if (dispatch(getCurrenciesFromLocalStorage()) === true) {
    return;
  }

  dispatch(fetchCurrenciesList());
};

export const selectCurrenciesList = (state) => state.currencies.list;
export const selectFetchingState = (state) => state.currencies.isFetching;
export const selectFetchingError = (state) => state.currencies.error;

export default currenciesSlice.reducer;
