import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarNav,
  NavItem,
  CloseButton,
} from "./Sidebar.styles";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <span>Sistema</span>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
      </SidebarHeader>
      <SidebarNav>
        <NavItem to="/" $active={location.pathname === "/"}>
          Dashboard
        </NavItem>
        <NavItem to="/clients" $active={location.pathname === "/clients"}>
          Clientes
        </NavItem>
        <NavItem to="/rentals" $active={location.pathname === "/rentals"}>
          Locações
        </NavItem>
        <NavItem
          to="/reservations"
          $active={location.pathname === "/reservations"}
        >
          Reservas
        </NavItem>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
