import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Clients from "../features/clients/pages/Clients/Clients";
import Dashboard from "../pages/Dashboard/Dashboard";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
