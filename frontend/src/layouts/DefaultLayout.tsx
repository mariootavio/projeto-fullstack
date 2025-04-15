import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
`;

const Content = styled.main`
  margin-left: 220px;
  padding: 2rem;
  width: 100%;
`;

const DefaultLayout = () => (
  <Layout>
    <Sidebar />
    <Content>
      <Outlet />
    </Content>
  </Layout>
);

export default DefaultLayout;
