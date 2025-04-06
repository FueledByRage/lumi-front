import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

export const FiltersButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? "#043f23" : "#ffffff"};
  color: ${props => props.active ? "#ffffff" : "#000000"};
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const YearButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? "#868686" : "#e0e0e0"};
  color: ${props => props.active ? "#ffffff" : "#000000"};
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  width: 220px;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: white;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    border-color: #106b52;
    box-shadow: 0 0 0 2px rgba(16, 107, 82, 0.2);
  }
  
  /* Add the search icon */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>');
  background-repeat: no-repeat;
  background-position: calc(100% - 8px) center;
  padding-right: 32px;
`;