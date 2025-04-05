import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
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