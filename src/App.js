import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Styles
import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import colors from './utils/colors';

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

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
