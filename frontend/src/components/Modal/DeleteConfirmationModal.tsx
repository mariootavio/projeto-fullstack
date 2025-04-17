import { Overlay, ModalContainer, CloseButton } from "./Modal.styles";
import {
  CancelButton,
  ConfirmButton,
  ButtonGroup,
} from "../Button/ModalActionButtons";

interface DeleteConfirmationModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onCancel}>×</CloseButton>
      <h3>{title}</h3>
      <p>{description}</p>
      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
        <ConfirmButton type="button" onClick={onConfirm}>
          Confirmar
        </ConfirmButton>
      </ButtonGroup>
    </ModalContainer>
  </Overlay>
);

export default DeleteConfirmationModal;
