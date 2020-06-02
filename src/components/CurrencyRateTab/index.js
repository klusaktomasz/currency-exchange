import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 1em;
  padding: 0.5em;
  width: 200px;

  &:before,
  &:after {
    content: '';
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
  }

  &:before {
    width: calc(100% - 1em);
    height: 1px;
    left: 0.5em;
    bottom: 0;
  }

  &:after {
    width: 1px;
    height: calc(100% - 1em);
    right: 0;
    bottom: 0.5em;
  }
`;

const RateName = styled.h2`
  font-size: 1em;
  font-weight: 400;
  margin: 0 0 0.25em;
`;

const RateValue = styled.div`
  font-size: 2em;
  font-weight: 700;
  text-align: right;
`;

const CurrencyRateTab = (props) => {
  const { from, to, rate } = props;

  return (
    <Wrapper>
      <RateName>
        {from} / {to}
      </RateName>
      <RateValue>{rate}</RateValue>
    </Wrapper>
  );
};

CurrencyRateTab.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};

export default CurrencyRateTab;
