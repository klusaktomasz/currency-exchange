import { css } from 'styled-components';
import colors from '../utils/colors';

export default css`
  background: ${colors.white};
  border: 2px solid ${colors.graySoft};
  font: 700 1em 'Roboto', sans-serif;
  padding: 0.75em 0.5em;
  border-radius: 4px;
  min-width: 260px;
  margin-top: 8px;

  &:focus {
    outline: 2px ${colors.oceanicBlue} solid;
    box-shadow: 0 0 5px 0 ${colors.oceanicBlue};
  }
`;
