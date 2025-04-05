import styled from 'styled-components';

export const DrawerContainer = styled.div`
  padding: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileInputLabel = styled.label`
  font-weight: 500;
  color: #555;
`;

export const FileInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:hover {
    border-color: #bbbbbb;
  }
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: #666;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  background-color: ${props => props.type === 'success' ? '#e6f7e6' : '#ffebeb'};
  color: ${props => props.type === 'success' ? '#2e7d32' : '#d32f2f'};
  border: 1px solid ${props => props.type === 'success' ? '#a5d6a7' : '#ef9a9a'};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;