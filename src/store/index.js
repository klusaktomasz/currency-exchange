import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './reducers/currencies';

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});
