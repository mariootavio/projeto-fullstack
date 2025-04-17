import axios from "axios";
import { Rental, RentalFormData } from "../types/rental";

const API = "http://localhost:3001/api/rentals";

export const getAllRentals = async (): Promise<Rental[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const getRentalById = async (id: number): Promise<Rental> => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createRental = async (data: RentalFormData) => {
  return axios.post(API, data);
};

export const updateRental = async (id: number, data: RentalFormData) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteRental = async (id: number) => {
  return axios.delete(`${API}/${id}`);
};

export const getAvailableRentals = async (
  start: string,
  end: string
): Promise<Rental[]> => {
  const response = await axios.get(`${API}/available`, {
    params: { start, end },
  });
  return response.data;
};
