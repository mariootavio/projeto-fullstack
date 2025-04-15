import { NavLink } from "react-router-dom";
import { Container, Nav } from "./Sidebar.styles";

const Sidebar = () => {
  return (
    <Container>
      <h2>Sistema</h2>
      <Nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/clients">Clientes</NavLink>
        <NavLink to="/rentals">Locações</NavLink>
        <NavLink to="/reservations">Reservas</NavLink>
      </Nav>
    </Container>
  );
};

export default Sidebar;
