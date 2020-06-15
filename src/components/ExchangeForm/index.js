import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import { useSelector } from 'react-redux';
import colors from '../../utils/colors';
import inputMixin from '../../mixins/input';

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
  const currenciesOptions = useSelector((state) => {
    const { list } = state.currencies;

    return Object.entries(list).map((el) => ({
      value: el[0],
      label: `(${el[0]}) ${el[1]}`,
    }));
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
          />
        </Label>
        <Label>
          Amount
          {/*
            Not using type=number due to a11y
            (https://design-system.service.gov.uk/components/text-input/#asking-for-decimal-numbers)
           */}
          <InputAmount type="text" pellcheck="false" />
        </Label>
      </Box>
      <Box>
        <Label>
          To
          <CurrenciesSelect
            options={currenciesOptions}
            defaultValue={DEFAULT_EXCHANGE.to}
            classNamePrefix="react-select"
          />
        </Label>
        <Label>
          Exchanged Amount
          <OutputAmount>1.00</OutputAmount>
        </Label>
      </Box>
    </Form>
  );
};

export default ExchangeForm;
