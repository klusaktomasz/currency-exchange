import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import colors from '../../utils/colors';
import inputMixin from '../../mixins/input';

import ReactSelect from 'react-select';

import { fetchRate } from '../../store/reducers/rates';
import { formatDate } from '../../utils/api-helpers';

import { DEFAULT_EXCHANGE } from '../../config';

const Form = styled.form`
  color: ${colors.black};
  display: flex;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  margin: 0 40px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  margin-bottom: 2em;
`;

const InputAmount = styled.input`
  ${inputMixin}
`;

const OutputAmount = styled.output`
  ${inputMixin}
  background: ${colors.whiteSoftDark};
`;

const CurrenciesSelect = styled(ReactSelect)`
  .react-select__control {
    ${inputMixin}
  }

  .react-select__value-container {
    padding: 0;
  }

  .react-select__indicators {
    display: none;
  }
`;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const [fromAmount, setFromAmount] = useState(1.0);
  const [convertedAmount, setConvertedAmount] = useState(1.0);
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_EXCHANGE.from.value);
  const [toCurrency, setToCurrency] = useState(DEFAULT_EXCHANGE.to.value);
  const [isLoading, setIsLoading] = useState(false);

  const exchangeRate = useSelector((state) => {
    if (fromCurrency === toCurrency) {
      return 1;
    }

    return state.rates.rates[fromCurrency]?.[formatDate(Date.now())]?.[
      toCurrency
    ];
  });
  const currenciesOptions = useSelector((state) => {
    const { list } = state.currencies;

    return Object.entries(list).map((el) => ({
      value: el[0],
      label: `(${el[0]}) ${el[1]}`,
    }));
  });

  const handleAmountChange = (e) => {
    // Change , to .
    const input = e.target.value.split(',').join('.');
    setFromAmount(input);
  };

  const handleFromCurrencyChange = ({ value: currency }) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = ({ value: currency }) => {
    setToCurrency(currency);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Fetch needed rate if not in store.
    if (typeof exchangeRate === 'undefined') {
      setIsLoading(true);
      dispatch(fetchRate(fromCurrency, toCurrency)).then(setIsLoading(false));
      return;
    }

    // Make sure amount is a number.
    if (Number.isNaN(Number(fromAmount))) {
      setConvertedAmount(0);
      return;
    }

    setConvertedAmount(fromAmount * exchangeRate);
  });

  return (
    <Form>
      <Box>
        <Label>
          From
          <CurrenciesSelect
            options={currenciesOptions}
            defaultValue={DEFAULT_EXCHANGE.from}
            classNamePrefix="react-select"
            onChange={handleFromCurrencyChange}
          />
        </Label>
        <Label>
          Amount
          {/*
            Not using type=number due to a11y
            (https://design-system.service.gov.uk/components/text-input/#asking-for-decimal-numbers)
           */}
          <InputAmount
            value={fromAmount}
            onChange={handleAmountChange}
            type="text"
            pellcheck="false"
          />
        </Label>
      </Box>
      <Box>
        <Label>
          To
          <CurrenciesSelect
            options={currenciesOptions}
            defaultValue={DEFAULT_EXCHANGE.to}
            classNamePrefix="react-select"
            onChange={handleToCurrencyChange}
          />
        </Label>
        <Label>
          Exchanged Amount
          <OutputAmount>{convertedAmount}</OutputAmount>
        </Label>
      </Box>
    </Form>
  );
};

export default ExchangeForm;
