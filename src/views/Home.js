import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-family: sans-serif;
  font-weight: 400;
  font-size: 15px;
`;

const Home = () => (
  <div>
    <H1>Currency Exchange</H1>
    <img src="logo192.png" alt="" />
  </div>
);

export default Home;
