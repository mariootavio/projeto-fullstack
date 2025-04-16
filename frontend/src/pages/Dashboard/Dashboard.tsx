import { DashboardWrapper, Title, LogoImage } from "./Dashboard.styles";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Title>Bem-vindo ao Sistema de Locação</Title>
      <LogoImage src="/logo.png" alt="Sistema de Locação" />
    </DashboardWrapper>
  );
};

export default Dashboard;
