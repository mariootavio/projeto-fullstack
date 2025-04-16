import axios from "axios";
import { Client } from "../types/client";

const API_URL = "http://localhost:3001/api/clients";

export const getAllClients = async (): Promise<Client[]> => {
  const response = await axios.get<Client[]>(API_URL);
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await axios.get<Client>(`${API_URL}/${id}`);
  return response.data;
};

export const createClient = async (data: Omit<Client, "id" | "createdAt">) => {
  return axios.post(API_URL, data);
};

export const updateClient = async (
  id: number,
  data: Omit<Client, "id" | "createdAt">
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteClient = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
