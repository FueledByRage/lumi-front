import styled from 'styled-components';

export const FloatButtonContainer = styled.button`
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #043f23;
  color: white;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 999;
  
  &:hover {
    transform: scale(1.1);
    background-color: #043f23;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;