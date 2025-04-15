import axios from "axios";
import { Client } from "../types/client";

const API_URL = "http://localhost:3001/api/clients";

export const getAllClients = async (): Promise<Client[]> => {
  const response = await axios.get<Client[]>(API_URL);
  return response.data;
};
