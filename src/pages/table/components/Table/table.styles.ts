import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-family: Arial, sans-serif;
  margin: 20px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const Th = styled.th`
  background-color: #043f23;
  color: white;
  padding: 12px 8px;
  border: 1px solid #043f23;
  text-align: left;
  font-weight: normal;
`;

export const Td = styled.td`
  padding: 12px 8px;
  border: 1px solid #e0e0e0;
  word-wrap: break-word;
  text-align: left;
  background-color: #ffffff;
`;

export const TrAlternate = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &:nth-child(even) td {
    background-color: #f5f5f5;
  }
`;

export const MonthIconCell = styled.td`
  text-align: center;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 12px 4px;
  width: 40px;
`;

export const InvoiceIcon = styled.span<{ active: boolean }>`
  font-size: 18px;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  opacity: ${props => props.active ? 1 : 0.3};
  transition: opacity 0.2s ease;
`;