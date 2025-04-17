import axios from "axios";

const BASE_URL = "http://localhost:3001/api/reservations";
const AVAILABLE_RENTALS_URL = "http://localhost:3001/api/rentals/available";
const CLIENTS_URL = "http://localhost:3001/api/clients";

export const reservationService = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  create: (data: any) => axios.post(BASE_URL, data),
  update: (id: number, data: any) => axios.put(`${BASE_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE_URL}/${id}`),
  getAvailableRentals: (start: string, end: string) =>
    axios.get(`${AVAILABLE_RENTALS_URL}?start=${start}&end=${end}`),
  getClients: () => axios.get(CLIENTS_URL),
};
