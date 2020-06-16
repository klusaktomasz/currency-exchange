import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import RateTab from '../RateTab';

import { fetchRate } from '../../store/reducers/rates';
import { formatDate } from '../../utils/api-helpers';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const FilledTab = styled(RateTab)`
  flex: 1 1 auto;
`;

const RateTabs = ({ className, from, to, date }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = formatDate(date);

  const ratesList = useSelector((state) => {
    if (isLoading) {
      return null;
    }

    let currencies = [];
    if (typeof to === 'string') currencies.push(to);
    else currencies = to;

    return currencies.map((curr) => (
      <FilledTab
        key={`${from}/${curr}`}
        from={from}
        to={curr}
        rate={state.rates.rates[from]?.[formattedDate]?.[curr]}
      />
    ));
  });

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRate(from, to, date)).then(setIsLoading(false));
  }, []);

  return <Wrapper className={className}>{ratesList}</Wrapper>;
};

RateTabs.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  date: PropTypes.number.isRequired,
};

export default RateTabs;
