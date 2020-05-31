import { createSlice } from '@reduxjs/toolkit';
import { createAPIURLToRate } from '../../utils/api-helpers';

const RATES_LOCAL_HOOK = 'curr_rates';

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    error: false,
    isFetching: false,
    rates: {},
  },
  reducers: {
    setFetchingError: (state, action) => {
      state.error = action.payload;
    },
    setFetchingState: (state, action) => {
      state.isFetching = action.payload;
    },
    saveStateToLocal: (state) => {
      localStorage.setItem(RATES_LOCAL_HOOK, state.rates);
    },
    replaceRates: (state, action) => {
      state.rates = action.payload;
    },
    addRate: (state, action) => {
      const { base, date, rates } = action.payload;

      if (typeof state.rates[base] === 'undefined') {
        state.rates[base] = {};
        state.rates[base][date] = {};
      }

      state.rates[base][date] = {
        ...JSON.parse(JSON.stringify(state.rates[base][date])),
        ...rates,
      };
    },
  },
});

export const {
  setFetchingError,
  setFetchingState,
  saveStateToLocal,
  replaceRates,
  addRate,
} = ratesSlice.actions;

export const getStateFromLocal = () => (dispatch) => {
  const localData = localStorage.getItem(RATES_LOCAL_HOOK);
  if (localData === null) {
    return false;
  }

  dispatch(replaceRates(JSON.parse(localData)));
  return true;
};

export const fetchRate = (from, to = null, date = Date.now()) => async (
  dispatch
) => {
  dispatch(setFetchingState(true));

  try {
    const res = await fetch(createAPIURLToRate(from, to, date));
    const data = await res.json();

    dispatch(addRate(data));
  } catch (e) {
    dispatch(setFetchingError(true));
  }

  dispatch(setFetchingState(false));
};

export const selectCurrenciesList = (state) => state.rates.list;
export const selectFetchingState = (state) => state.rates.isFetching;
export const selectAllRates = (state) => state.rates.rates;

export default ratesSlice.reducer;
