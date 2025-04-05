import React, { useEffect, useState, ReactNode } from 'react';
import { CloseButton, DrawerContainer, Overlay } from './drawer.styles';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  
  const handleClose = (): void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };
  
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen && !isClosing) return null;
  
  return (
    <>
      <Overlay isOpen={isOpen} isClosing={isClosing} onClick={handleClose} />
      <DrawerContainer isOpen={isOpen} isClosing={isClosing}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        {children}
      </DrawerContainer>
    </>
  );
};

export default Drawer;