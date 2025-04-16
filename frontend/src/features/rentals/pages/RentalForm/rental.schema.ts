// src/features/rentals/pages/RentalForm/rental.schema.ts
import { z } from "zod";

export const rentalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  description: z.string().optional(),
  pricePerHour: z
    .number({ invalid_type_error: "Informe um número válido" })
    .positive("Preço por hora deve ser maior que zero"),
  minTime: z
    .number({ invalid_type_error: "Informe um número válido" })
    .int("Deve ser um número inteiro")
    .min(1, "Tempo mínimo deve ser pelo menos 1 hora"),
  maxTime: z
    .number({ invalid_type_error: "Informe um número válido" })
    .int("Deve ser um número inteiro")
    .min(1, "Tempo máximo deve ser pelo menos 1 hora"),
});

export type RentalFormData = z.infer<typeof rentalSchema>;
