import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  LayoutWrapper,
  Content,
  TopBar,
  MenuButton,
} from "./DefaultLayout.styles";

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <TopBar>
        <MenuButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <Menu />
        </MenuButton>
      </TopBar>
      <LayoutWrapper>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <Content>
          <Outlet />
        </Content>
      </LayoutWrapper>
    </>
  );
};

export default DefaultLayout;
