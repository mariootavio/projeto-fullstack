import styled from "styled-components";

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.85;
  }
`;

export default DeleteButton;
