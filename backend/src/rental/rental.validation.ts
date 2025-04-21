import { z } from "zod";

const numberField = (label: string) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? undefined : val),
    z
      .number({
        required_error: `${label} é obrigatório`,
        invalid_type_error: `${label} deve ser um número`,
      })
      .refine((val) => val > 0, {
        message: `${label} deve ser maior que 0`,
      })
  );

export const createRentalSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório"),

  type: z
    .string({
      required_error: "Tipo é obrigatório",
      invalid_type_error: "Tipo deve ser uma string",
    })
    .min(1, "Tipo é obrigatório"),

  description: z
    .string({
      invalid_type_error: "Descrição deve ser uma string",
    })
    .nullable()
    .optional(),

  pricePerHour: numberField("Preço por hora"),
  minTime: numberField("Tempo mínimo"),
  maxTime: numberField("Tempo máximo"),
});

export const updateRentalSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório")
    .optional(),

  type: z
    .string({
      invalid_type_error: "Tipo deve ser uma string",
    })
    .min(1, "Tipo é obrigatório")
    .optional(),

  description: z
    .string({
      invalid_type_error: "Descrição deve ser uma string",
    })
    .nullable()
    .optional(),

  pricePerHour: z
    .number({
      invalid_type_error: "Preço por hora deve ser um número",
    })
    .refine((val) => val > 0, {
      message: "Preço por hora deve ser maior que 0",
    })
    .optional(),

  minTime: z
    .number({
      invalid_type_error: "Tempo mínimo deve ser um número",
    })
    .refine((val) => val > 0, {
      message: "Tempo mínimo deve ser maior que 0",
    })
    .optional(),

  maxTime: z
    .number({
      invalid_type_error: "Tempo máximo deve ser um número",
    })
    .refine((val) => val > 0, {
      message: "Tempo máximo deve ser maior que 0",
    })
    .optional(),
});
