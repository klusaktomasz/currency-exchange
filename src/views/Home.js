import React from 'react';
import styled from 'styled-components';

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

const Home = () => {
  return (
    <HomeContainer>
      <H1>
        Currency <Divider>Exchange</Divider>
      </H1>
    </HomeContainer>
  );
};

export default Home;
