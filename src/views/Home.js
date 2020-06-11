import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import RateTabs from '../components/RateTabs';

import DEFAULT_RATES from '../config/homeRates';

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Home = () => {
  const [renderRateTabs, setRenderRateTabs] = useState(false);
  const [ratesTo, setRatesTo] = useState(DEFAULT_RATES.to);

  const shouldRenderTabs = () => {
    setRenderRateTabs(window.innerWidth >= 400);

    const rateTabsAmount = Math.floor(window.innerWidth / 200);
    setRatesTo(DEFAULT_RATES.to.slice(0, rateTabsAmount));
  };

  useEffect(() => {
    window.addEventListener('resize', shouldRenderTabs);

    return () => {
      window.removeEventListener('resize', shouldRenderTabs);
    };
  });

  useEffect(() => {
    shouldRenderTabs();
  }, []);

  return (
    <>
      <HomeContainer>
        <H1>
          Currency <Divider>Exchange</Divider>
        </H1>
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

export default Home;
