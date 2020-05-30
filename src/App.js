import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Styles
import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import colors from './utils/colors';

// Dispatches
import { getCurrenciesList } from './store/reducers/currencies';
import { getStateFromLocal } from './store/reducers/rates';

// Routes
import Home from './views/Home';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.whiteSoft};
    color: ${colors.blackSoft};
    font-family: 'Roboto', sans-serif;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  dispatch(getCurrenciesList());
  dispatch(getStateFromLocal());
  // dispatch(fetchRate('USD'));

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
