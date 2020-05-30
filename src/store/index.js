import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './reducers/currencies';
import ratesReducer from './reducers/rates';

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    rates: ratesReducer,
  },
});
