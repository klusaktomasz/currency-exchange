import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import inputMixin from '../../mixins/input';

const Form = styled.form`
  color: ${colors.black};
  display: flex;
`;

const Box = styled.div`
  margin: 0 40px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1em;
`;

const InputAmount = styled.input`
  ${inputMixin}
`;

const OutputAmount = styled.output`
  ${inputMixin}
  background: ${colors.whiteSoftDark};
`;

const ExchangeForm = () => {
  return (
    <Form>
      <Box>
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
          Amount
          <OutputAmount>1.00</OutputAmount>
        </Label>
      </Box>
    </Form>
  );
};

export default ExchangeForm;
