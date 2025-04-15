import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Clients from "../features/clients/pages/Clients";
import ClientForm from "../features/clients/pages/ClientForm";

const Dashboard = () => <h1>Dashboard</h1>;

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<ClientForm />} />
        <Route path="clients/:id/edit" element={<ClientForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
