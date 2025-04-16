// src/features/rentals/components/RentalTable.styles.ts
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 8px;
    }

    td {
      display: block;
      width: 100%;
      border: none;
      padding: 8px;
    }

    td::before {
      content: attr(data-label);
      font-weight: bold;
      display: block;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 4px;
    }
  }
`;
