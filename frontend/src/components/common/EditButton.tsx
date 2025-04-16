import styled from "styled-components";

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 4px;

  &:hover {
    opacity: 0.85;
  }
`;

export default EditButton;
