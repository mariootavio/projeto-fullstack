import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
`;

export const Content = styled.main`
  flex: 1;
  margin-left: 220px;
  padding: 5rem 2rem 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 5rem 1rem 1rem;
  }
`;

export const TopBar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;
