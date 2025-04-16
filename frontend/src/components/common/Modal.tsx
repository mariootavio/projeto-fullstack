import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 2px solid ${({ theme }) => theme.colors.primaryLight};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

interface ModalProps {
  children: React.ReactNode;
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
