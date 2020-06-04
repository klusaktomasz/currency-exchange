import { css, keyframes } from 'styled-components';
import colors from '../utils/colors';

const loading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export default css`
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  :before {
    z-index: 3;
    background: ${colors.whiteDark};
  }

  &:after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    animation: ${loading} 1.5s infinite;
    z-index: 4;
  }
`;
