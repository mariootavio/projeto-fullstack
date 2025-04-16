import styled from "styled-components";
import { Link } from "react-router-dom";

interface SidebarContainerProps {
  isOpen: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  width: 220px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 1.5rem 1rem;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  transition: left 0.3s ease;
  z-index: 15;

  @media (min-width: 769px) {
    left: 0;
  }
`;

export const SidebarHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NavItem = styled(Link)<{ $active?: boolean }>`
  font-weight: bold;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.primaryLighter};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
