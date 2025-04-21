export interface ClientEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: Date;
}

export interface ClientResponseDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
}

export interface ClientCreateDTO {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface ClientUpdateDTO {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
}
