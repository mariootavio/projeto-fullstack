export interface RentalEntity {
  id: number;
  name: string;
  type: string;
  description: string | null;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
  createdAt: Date;
}

export interface RentalResponseDTO {
  id: number;
  name: string;
  type: string;
  description: string | null;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
  createdAt: string;
}

export interface RentalCreateDTO {
  name: string;
  type: string;
  description?: string | null;
  pricePerHour: number;
  minTime: number;
  maxTime: number;
}

export interface RentalUpdateDTO {
  name?: string;
  type?: string;
  description?: string | null;
  pricePerHour?: number;
  minTime?: number;
  maxTime?: number;
}
