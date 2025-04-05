import styled, { keyframes, css } from 'styled-components';

// Define as interfaces para os props dos componentes
interface AnimatedElementProps {
  isOpen: boolean;
  isClosing: boolean;
}

export const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Overlay = styled.div<AnimatedElementProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${({ isOpen, isClosing }) =>
    isOpen && !isClosing
      ? css`${fadeIn} 0.3s ease forwards`
      : isClosing
      ? css`${fadeOut} 0.3s ease forwards`
      : 'none'};
`;

export const DrawerContainer = styled.div<AnimatedElementProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  padding: 20px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${({ isOpen, isClosing }) =>
    isOpen && !isClosing
      ? css`${slideIn} 0.3s ease forwards`
      : isClosing
      ? css`${slideOut} 0.3s ease forwards`
      : 'none'};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #000;
  }
`;