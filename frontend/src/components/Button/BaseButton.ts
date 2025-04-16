import styled from "styled-components";

const BaseButton = styled.button`
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

export default BaseButton;
