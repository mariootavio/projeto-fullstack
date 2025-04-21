import { z } from "zod";

export const reservationSchema = z
  .object({
    clientId: z.coerce.number().min(1, "Selecione um cliente"),
    type: z.string().min(1, "Selecione um tipo de locação"),
    rentalId: z.coerce.number().min(1, "Selecione uma locação"),
    startDate: z
      .string()
      .min(1, "Data inicial obrigatória")
      .refine((date) => new Date(date) >= new Date(), {
        message: "A data de início deve ser a partir de agora",
      }),
    endDate: z.string().min(1, "Data final obrigatória"),
    status: z.string().min(1, "Status é obrigatório"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Data final deve ser maior que a data inicial",
    path: ["endDate"],
  });

export type ReservationFormData = z.infer<typeof reservationSchema>;
