import styled from "styled-components";
import BaseButton from "./BaseButton";

const DeleteButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

export default DeleteButton;
