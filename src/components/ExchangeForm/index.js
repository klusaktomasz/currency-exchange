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
  border-color: ${(props) => (props.error ? colors.redSoft : colors.graySoft)}
`;

const OutputAmount = styled.output`
  ${inputMixin}
  background: ${colors.whiteSoftDark};
  border-color: ${(props) => (props.error ? colors.redSoft : colors.graySoft)}
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
  const [inputError, setInputError] = useState(false);

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

  function handleAmountChange(e) {
    // Change , to .
    const input = e.target.value.split(',').join('.');
    const validateInput = Number.isNaN(Number(input));

    setFromAmount(input);
    // Validate if there is number valid number.
    setInputError(validateInput);
  }

  function handleEndOfFocusInput(e) {
    const input = e.target.value;

    if (input === '') {
      setFromAmount('0');
    }
  }

  function handleFromCurrencyChange({ value: currency }) {
    setFromCurrency(currency);
  }

  function handleToCurrencyChange({ value: currency }) {
    setToCurrency(currency);
  }

  useEffect(() => {
    if (isLoading || inputError) {
      return;
    }

    // Fetch needed rate if not in store.
    if (typeof exchangeRate === 'undefined') {
      setIsLoading(true);
      dispatch(fetchRate(fromCurrency, toCurrency)).then(setIsLoading(false));
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
            onBlur={handleEndOfFocusInput}
            type="text"
            pellcheck="false"
            error={inputError}
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
          <OutputAmount error={inputError}>{convertedAmount}</OutputAmount>
        </Label>
      </Box>
    </Form>
  );
};

export default ExchangeForm;
