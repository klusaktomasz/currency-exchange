import { createSlice } from '@reduxjs/toolkit';
import { CURRENCIES_LIST as CURRENCIES_LIST_API } from '../../utils/api-endpoints';

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
    update: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  update,
  setFetchingState,
  setFetchingError,
} = currenciesSlice.actions;

export const fetchCurrenciesList = () => async (dispatch) => {
  dispatch(setFetchingState(true));

  try {
    const res = await fetch(CURRENCIES_LIST_API);
    const data = await res.json();

    dispatch(update(data));
  } catch {
    dispatch(setFetchingError(true));
  }

  dispatch(setFetchingState(false));
};

export const selectCurrenciesList = (state) => state.currencies.list;
export const selectFetchingState = (state) => state.currencies.isFetching;
export const selectFetchingError = (state) => state.currencies.error;

export default currenciesSlice.reducer;
