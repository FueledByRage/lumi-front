import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
  }

  .pagination li.active a {
    background-color: #043f23;
    color: white;
    border-color: #043f23;
  }
`;