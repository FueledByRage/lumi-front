import React, { ReactNode } from 'react';
import { FloatButtonContainer, IconContainer } from './floatButton.styles';

interface FloatButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  ariaLabel?: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({ 
  onClick, 
  icon = '+', 
  ariaLabel = 'Menu flutuante' 
}) => {
  return (
    <FloatButtonContainer 
      onClick={onClick} 
      aria-label={ariaLabel}
    >
      <IconContainer>
        {icon}
      </IconContainer>
    </FloatButtonContainer>
  );
};

export default FloatButton;