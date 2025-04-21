import { z } from "zod";

const numberField = (field: string) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? undefined : val),
    z.number({
      required_error: `${field} é obrigatório`,
      invalid_type_error: `${field} deve ser um número válido`,
    })
  );

const dateField = (field: string) =>
  z
    .string({
      required_error: `${field} é obrigatório`,
      invalid_type_error: `${field} deve ser uma string`,
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: `Formato de data inválido em ${field.toLowerCase()}`,
    });

export const createReservationSchema = z.object({
  clientId: numberField("Cliente"),
  rentalId: numberField("Locação"),
  startDate: dateField("Data de início"),
  endDate: dateField("Data de fim"),
  finalPrice: numberField("Preço final").refine((val) => val > 0, {
    message: "Preço final deve ser maior que 0",
  }),
  status: z
    .string({
      required_error: "Status é obrigatório",
      invalid_type_error: "Status deve ser uma string",
    })
    .min(1, "Status é obrigatório"),
});

export const updateReservationSchema = z.object({
  clientId: numberField("Cliente").optional(),
  rentalId: numberField("Locação").optional(),
  startDate: dateField("Data de início").optional(),
  endDate: dateField("Data de fim").optional(),
  finalPrice: numberField("Preço final")
    .refine((val) => val > 0, {
      message: "Preço final deve ser maior que 0",
    })
    .optional(),
  status: z
    .string({
      invalid_type_error: "Status deve ser uma string",
    })
    .min(1, "Status é obrigatório")
    .optional(),
});
