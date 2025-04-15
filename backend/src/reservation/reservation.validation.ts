import { z } from "zod";

const requiredNumber = (field: string) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? undefined : val),
    z.number({
      required_error: `${field} é obrigatório`,
      invalid_type_error: `${field} deve ser um número válido`,
    })
  );

export const createReservationSchema = z.object({
  clientId: requiredNumber("Cliente"),
  rentalId: requiredNumber("Locação"),

  startDate: z
    .string({
      required_error: "Data de início é obrigatória",
      invalid_type_error: "Data de início deve ser uma string",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de data inválido",
    }),

  endDate: z
    .string({
      required_error: "Data de fim é obrigatória",
      invalid_type_error: "Data de fim deve ser uma string",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de data inválido",
    }),

  finalPrice: requiredNumber("Preço final"),

  status: z
    .string({
      required_error: "Status é obrigatório",
      invalid_type_error: "Status deve ser uma string",
    })
    .min(1, "Status é obrigatório"),
});

export const updateReservationSchema = z.object({
  clientId: requiredNumber("Cliente"),
  rentalId: requiredNumber("Locação"),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de data inválido",
    })
    .optional(),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de data inválido",
    })
    .optional(),
  finalPrice: requiredNumber("Preço final"),
  status: z
    .string({
      invalid_type_error: "Status deve ser uma string",
    })
    .min(1, "Status é obrigatório")
    .optional(),
});
