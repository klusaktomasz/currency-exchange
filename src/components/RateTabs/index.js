import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRate, selectFetchingState } from '../../store/reducers/rates';
import { formatDate } from '../../utils/api-helpers';

import RateTab from '../RateTab';

const Wrapper = styled.div`
  display: flex;
`;

// TODO(@klusaktomasz): Add media queries.
const RateTabs = ({ className, from, to, date }) => {
  const dispatch = useDispatch();
  const formattedDate = formatDate(date);
  const isFetching = useSelector(selectFetchingState);

  useEffect(() => {
    dispatch(fetchRate(from, to, date));
  }, []);

  const ratesList = useSelector((state) => {
    if (isFetching) {
      return null;
    }

    let currencies = [];
    if (typeof to === 'string') currencies.push(to);
    else currencies = to;

    return currencies.map((curr) => (
      <RateTab
        key={`${from}/${curr}`}
        from={from}
        to={curr}
        rate={state.rates.rates[from]?.[formattedDate]?.[curr]}
      />
    ));
  });

  return <Wrapper className={className}>{ratesList}</Wrapper>;
};

RateTabs.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  date: PropTypes.number.isRequired,
};

export default RateTabs;
