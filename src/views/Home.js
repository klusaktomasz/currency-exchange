import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurrenciesList,
  selectCurrenciesList,
  selectFetchingState,
} from '../store/reducers/currencies';

const H1 = styled.h1`
  font-family: sans-serif;
  font-weight: 400;
  font-size: 15px;
`;

const Home = () => {
  const currenciesList = useSelector(selectCurrenciesList);
  const isFetching = useSelector(selectFetchingState);
  const dispatch = useDispatch();

  return (
    <div>
      <H1>Currency Exchange</H1>
      <img src="logo192.png" alt="" />
      <div>
        <b>{JSON.stringify(isFetching)}</b>
        <br />
        {JSON.stringify(currenciesList)}
      </div>
      <button type="button" onClick={() => dispatch(fetchCurrenciesList())}>
        Fetch api
      </button>
    </div>
  );
};

export default Home;
