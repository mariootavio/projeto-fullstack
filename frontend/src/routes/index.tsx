import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Clients from "../features/clients/pages/Clients";
import Dashboard from "../pages/Dashboard/Dashboard";
import Rentals from "../features/rentals/pages/Rentals";
import Reservations from "../features/reservations/pages/Reservations";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="rentals" element={<Rentals />} />
        <Route path="reservations" element={<Reservations />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
