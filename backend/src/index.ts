import express from "express";
import cors from "cors";

import clientRoutes from "./client/client.routes";
import rentalRoutes from "./rental/rental.routes";
import reservationRoutes from "./reservation/reservation.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
