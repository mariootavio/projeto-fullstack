import { ReactNode } from "react";
import { Overlay, ModalContainer, CloseButton } from "./Modal.styles";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </ModalContainer>
  </Overlay>
);

export default Modal;
