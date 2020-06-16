import { createSlice } from '@reduxjs/toolkit';
import { createAPIURLToRate, formatDate } from '../../utils/api-helpers';

const RATES_LOCAL_HOOK = 'curr_rates';

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    error: false,
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
      localStorage.setItem(RATES_LOCAL_HOOK, JSON.stringify(state.rates));
    },
    replaceRates: (state, action) => {
      state.rates = action.payload;
    },
    addRate: (state, action) => {
      const { base, date, rates, needUpdate } = action.payload;

      if (typeof state.rates[base] === 'undefined') {
        state.rates[base] = {};
      }

      if (typeof state.rates[base][date] === 'undefined') {
        state.rates[base][date] = {};
      }

      if (needUpdate === true) {
        state.rates[base][date].needUpdate = true;
      }

      state.rates[base][date] = {
        ...rates,
        ...JSON.parse(JSON.stringify(state.rates[base][date])),
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
  if (from === to) {
    return;
  }

  try {
    const res = await fetch(createAPIURLToRate(from, to, date));
    const data = await res.json();

    // Add info that currency rate wasn't updated yet for current date and is using last available.
    const wantedDate = formatDate(date);
    if (data.date !== wantedDate) {
      data.date = wantedDate;
      data.needUpdate = true;
    }

    dispatch(addRate(data));
    dispatch(saveStateToLocal());
  } catch (e) {
    dispatch(setFetchingError(true));
    console.error(e);
  }
};

export default ratesSlice.reducer;
