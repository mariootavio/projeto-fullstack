import styled from "styled-components";
import BaseButton from "./BaseButton";

const EditButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: 4px;
`;

export default EditButton;
