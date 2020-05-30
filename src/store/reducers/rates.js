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
  },
});

export const {
  setFetchingError,
  setFetchingState,
  saveStateToLocal,
  replaceRates,
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

    console.log(data);
  } catch {
    dispatch(setFetchingError(true));
  }

  dispatch(setFetchingState(false));
};

export default ratesSlice.reducer;
