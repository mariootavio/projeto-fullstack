export interface Rental {
  id: number;
  name: string;
  type: string;
  description?: string;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
  createdAt: string;
}

export type RentalFormData = Omit<Rental, "id" | "createdAt">;
