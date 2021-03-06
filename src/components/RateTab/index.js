import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import loadingMixin from '../../mixins/loading';

const Wrapper = styled.div`
  font-size: 1em;
  padding: 0.5em;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(-90deg, transparent, rgba(255, 255, 255, 1));

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
  margin-left: auto;
`;

const RateNameLoading = styled(RateName)`
  ${loadingMixin}
  width: 75px;
  height: 1em;
`;

const RateValueLoading = styled(RateValue)`
  ${loadingMixin}
  width: 100px;
  height: 1em;
`;

const RateTab = ({ from, to, rate, className }) => {
  // Check if passed params, if no show loading state.
  if (
    typeof from === 'undefined' ||
    typeof to === 'undefined' ||
    typeof rate === 'undefined'
  ) {
    return (
      <Wrapper className={className}>
        <RateNameLoading />
        <RateValueLoading />
      </Wrapper>
    );
  }

  // Render if all params passed (from, to, rate).
  return (
    <Wrapper className={className}>
      <RateName>
        {from} / {to}
      </RateName>
      <RateValue>{rate}</RateValue>
    </Wrapper>
  );
};

RateTab.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  rate: PropTypes.number,
};

RateTab.defaultProps = {
  from: undefined,
  to: undefined,
  rate: undefined,
};

export default RateTab;
