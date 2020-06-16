import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled, { createGlobalStyle } from 'styled-components';
import colors from './utils/colors';
import 'normalize.css';

import RateTabs from './components/RateTabs';
import ExchangeForm from './components/ExchangeForm';

import { getCurrenciesList } from './store/reducers/currencies';
import { getStateFromLocal } from './store/reducers/rates';

import { DEFAULT_RATES } from './config';

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

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-weight: 500;
  font-size: 3em;
  text-align: center;
  line-height: 1em;
  width: 100%;
`;

const Divider = styled.span`
  display: block;
  text-align: center;
  font-size: 0.75em;
`;

const FixedRateTabs = styled(RateTabs)`
  position: absolute;
  left: 0;
  top: 0;
`;

const App = () => {
  const dispatch = useDispatch();
  const [renderRateTabs, setRenderRateTabs] = useState(false);
  const [ratesTo, setRatesTo] = useState(DEFAULT_RATES.to);

  function shouldRenderTabs() {
    setRenderRateTabs(window.innerWidth >= 400);

    const rateTabsAmount = Math.floor(window.innerWidth / 200);
    setRatesTo(DEFAULT_RATES.to.slice(0, rateTabsAmount));
  }

  useEffect(() => {
    dispatch(getCurrenciesList());
    dispatch(getStateFromLocal());

    shouldRenderTabs();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', shouldRenderTabs);

    return () => {
      window.removeEventListener('resize', shouldRenderTabs);
    };
  });

  return (
    <>
      <GlobalStyle />

      <HomeContainer>
        <H1>
          Currency <Divider>Exchange</Divider>
        </H1>
        <ExchangeForm />
      </HomeContainer>

      {renderRateTabs ? (
        <FixedRateTabs
          from={DEFAULT_RATES.from}
          to={ratesTo}
          date={Date.now()}
        />
      ) : null}
    </>
  );
};
export default App;
