import { z } from "zod";

export const reservationSchema = z.object({
  clientId: z.coerce.number().min(1, "Selecione um cliente"),
  rentalId: z.coerce.number().min(1, "Selecione uma locacao"),
  startDate: z.string().min(1, "Data inicial obrigatória"),
  endDate: z.string().min(1, "Data final obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
